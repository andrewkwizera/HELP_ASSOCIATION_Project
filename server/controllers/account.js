const Account = require('../model/account');

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

        console.log("New Account Created:", account);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Account creation failed',
            error: error.message
        });
    }
}

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


const getAllAccounts = async (req, res) => {
    const accounts = await Account.find({});
    res.status(200).json({
        success: true,
        data: accounts
    })
}

// Create a function for requesting a loan.

module.exports = { createAccount, getAllAccounts, getAccountByNumber }