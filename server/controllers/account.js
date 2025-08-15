const Account = require('../model/account');

// Create new account.
const createAccount = async (req, res) => {
    try {
        const existingAccount = await Account.findOne({ accountNumber: req.body.accountNumber });

        if (existingAccount) {
            return res.status(400).json({
                success: false,
                message: 'Account number already exists'
            });
        }

        const account = new Account(req.body);
        await account.save();

        res.status(201).json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Account creation failed',
            error: error.message
        });
    }
}

// Get account by account Number
const getAccountByNumber = async (req, res) => {
    try {
        const account = await Account.findOne({ accountNumber: req.params.accountNumber });

        if (!account) {
            return res.status(404).json({
                success: false,
                message: 'Account not found'
            });
        }

        res.status(200).json({
            success: true,
            data: account
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// Get all Accounts
const getAllAccounts = async (req, res) => {
    const accounts = await Account.find({});
    res.status(200).json({
        success: true,
        data: accounts
    })
}

// Create a function for amending accounts.

const updateAccount = async (req, res) => {
    try {
        const account = await Account.findOne({accountNumber:req.params.accountNumber})
        if (!account){
            res.status(401).json({
                success:false,
                message:"Account not found"
            })
        }else {
            account = await Account.findOneAndUpdate( req.params.accountNumber, req.body,{
                new: true
            })
            res.status(200).json({
                success:true,
                message:"Account updated sucessfully",
                data: account
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = { createAccount, getAllAccounts, getAccountByNumber,updateAccount }