const Transaction = require('../model/transactions');
const Account = require('../model/account')

const deposit = async (req, res) => {
    try {
        const act = await Account.findOne({accountNumber: req.params.accountNumber});

        if (!act) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        const amount = Number(act.balance) + Number(req.body.amount);
        const account = await Account.findOneAndUpdate({accountNumber:req.params.accountNumber},{ balance: amount }, { new: true })

        // Create and save the transaction
        const transaction = new Transaction({
            ...req.body,
            txnType: 'CR'
        });
        await transaction.save();

        res.status(200).json({
            success: true,
            data: account
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


const getAllTransactions = async (req,res) => {
    const transactions = await Transaction.find({});
    res.status(200).json({
        success:true,
        data:transactions
    })
}

const withdraw = async (req, res) => {
    try {
        const act = await Account.findOne({accountNumber:req.params.accountNumber});

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

        const amount = Number(act.balance) - Number(req.body.amount);

        // const account = await Account.findByIdAndUpdate(req.params.id, { balance: amount }, { new: true });
        const account = await Account.findOneAndUpdate({accountNumber:req.params.accountNumber},{balance:amount},{new:true})

        // Create and save the transaction
        const transaction = new Transaction({
            ...req.body,
            txnType: 'DR'
        });
        await transaction.save();

        res.status(200).json({
            success: true,
            data: account
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}


module.exports = {getAllTransactions,deposit,withdraw}