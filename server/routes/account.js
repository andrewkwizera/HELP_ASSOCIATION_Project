const express = require('express')
const {createAccount,getAllAccounts,getAccountByNumber} = require('../controllers/account')

const router = express.Router();

router.route('/account').post(createAccount).get(getAllAccounts)
router.route('/account/:accountNumber').get(getAccountByNumber)

module.exports = router