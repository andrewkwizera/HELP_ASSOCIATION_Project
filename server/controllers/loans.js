const Loan = require('../model/loan')
const Account = require('../model/account')

const requestLoan = async (req,res) => {
    try {
            const act = await Account.findOne({accountNumber: req.body.accountNumber});
    
            if (!act) {
                return res.status(404).json({
                    success: false,
                    message: 'Account not found'
                });
            }
    
            const amount = Number(act.loanBalance) + Number(req.body.loanAmount);
             const eligibleAmountBalnce = amount*0.3
             if(amount >2000000){
                return res.status(400).json({
                    success:false,
                    message:'Maximum loan given is 2M'
                })
            }
            else if (act.balance <eligibleAmountBalnce) {
                return res.status(400).json({
                    success:false,
                    message: 'You are not eligible for this loan, you must have atleast 30% savings of the loan'
                })
            }
            
            const account = await Account.findOneAndUpdate({accountNumber:req.body.accountNumber},{loanBalance: amount }, { new: true })
    
            // Create and save loan
            const installment = (amount/12) + (amount*0.01)
            const loan = new Loan({
                ...req.body,
                installmentAmount: installment
            });
            await loan.save();
    
            res.status(200).json({
                success: true,
                data: loan,
                acct: account
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server Error',
                error: error.message
            });
        }
}

const payLoan = async (req,res) => {
    try {
            const act = await Account.findOne({accountNumber: req.body.accountNumber});
    
            if (!act) {
                return res.status(404).json({
                    success: false,
                    message: 'Account not found'
                });
            }
    
            const amount = Number(act.loanBalance) - Number(req.body.loanAmount);
            
            const account = await Account.findOneAndUpdate({accountNumber:req.body.accountNumber},{loanBalance: amount }, { new: true })
            res.status(200).json({
                success: true,
                acct: account
            });
    
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Server Error',
                error: error.message
            });
        }
}

const bulkLoanPay = async (req, res) => {
  const { payments } = req.body;

  if (!Array.isArray(payments)) {
    return res.status(400).json({ message: 'Invalid data format' });
  }

  let successCount = 0;
  let failureCount = 0;
  const failed = [];

  for (const item of payments) {
    try {
      const { accountNumber, loanAmount } = item;
      const numericAmount = Number(loanAmount);

      if (!accountNumber || isNaN(numericAmount) || numericAmount <= 0) {
        failureCount++;
        failed.push({ ...item, reason: 'Invalid data' });
        continue;
      }

      const account = await Account.findOne({ accountNumber });

      if (!account) {
        failureCount++;
        failed.push({ ...item, reason: 'Account not found' });
        continue;
      }

      account.loanBalance -= numericAmount;
      if (account.loanBalance < 0) account.loanBalance = 0;

      await account.save();
      successCount++;
    } catch (err) {
      failureCount++;
      failed.push({ ...item, reason: 'Server error' });
    }
  }

  res.status(200).json({
    message: 'Bulk loan payment processing complete',
    successCount,
    failureCount,
    failed,
  });
}

const checkEligibility = async (req,res) => {
    try {
            const act = await Account.findOne({accountNumber: req.body.accountNumber});
    
            if (!act) {
                return res.status(404).json({
                    success: false,
                    message: 'Account not found'
                });
            }
    
            const amount = Number(act.balance);
             const eligibleAmount = amount*3
             if(eligibleAmount >2000000){
                return res.status(200).json({
                    success:true,
                    message:'You are eligible to a maximum of 2M'
                })
            }
            else {
                return res.status(200).json({
                    success:true,
                    message: `You are eligible to a maximum of ${eligibleAmount} 
                    payable in 1 year with 1% interest rate`
                })
            }
        } catch (error){

        }
}

module.exports = {requestLoan,payLoan,checkEligibility,bulkLoanPay}