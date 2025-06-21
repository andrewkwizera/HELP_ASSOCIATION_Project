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

}

module.exports = {requestLoan,payLoan}