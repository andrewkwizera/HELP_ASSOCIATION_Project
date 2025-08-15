const Transaction = require('../model/transactions');
const Account = require('../model/account')

const deposit = async (req, res) => {
    try {
        const act = await Account.findOne({ accountNumber: req.params.accountNumber });

        if (!act) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        act.balance = Number(act.balance) + Number(req.body.amount);
        await act.save();
        // Create and save the transaction
        const txn = new Transaction({
            accountId: act.accountNumber,
            amount: req.body.amount,
            txnType: "CR",
            narration: "Deposit",
        });
        await txn.save();
        res.status(200).json({
            success: true,
            data: act
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


const getAllTransactions = async (req, res) => {
    const transactions = await Transaction.find({});
    res.status(200).json({
        success: true,
        data: transactions
    })
}

const withdraw = async (req, res) => {
    try {
        const act = await Account.findOne({ accountNumber: req.params.accountNumber });

        if (!act) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        if (Number(act.balance) < Number(req.body.amount)) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient balance'
            });
        }

        act.balance = Number(act.balance) - Number(req.body.amount);

        await act.save()
        // Create and save the transaction
        const txn = new Transaction({
            accountId: act.accountNumber,
            amount: req.body.amount,
            txnType: "CR",
            narration: "Deposit",
        });
        await txn.save();

        res.status(200).json({
            success: true,
            data: act
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

const bulkDeposit = async (req, res) => {
  const { deposits } = req.body; // Expecting [{ accountNumber, amount }, ...]

  if (!Array.isArray(deposits)) {
    return res.status(400).json({ message: 'Invalid input format' });
  }

  let successCount = 0;
  let failureCount = 0;
  const failed = [];

  for (const item of deposits) {
    try {
      const { accountNumber, amount } = item;
      const numericAmount = Number(amount);

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

      account.balance += numericAmount;
      await account.save();

      const txn = new Transaction({
        accountId: account._id,
        amount: numericAmount,
        txnType: 'CR',
        narration: 'Bulk Deposit',
      });

      await txn.save();
      successCount++;
    } catch (err) {
      failureCount++;
      failed.push({ ...item, reason: 'Server error' });
    }
  }

  res.status(200).json({
    message: 'Bulk deposit processing complete',
    successCount,
    failureCount,
    failed,
  });
}


module.exports = { getAllTransactions, deposit, withdraw, bulkDeposit }