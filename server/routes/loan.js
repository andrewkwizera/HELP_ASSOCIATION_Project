const express = require('express')
const {requestLoan,payLoan,checkEligibility,bulkLoanPay} = require('../controllers/loans')

const router = express.Router();

router.route('/loan').post(requestLoan)
router.route('/payloan').post(payLoan)
router.route('/loanEligibility').post(checkEligibility)
router.route('/bulk-loan-payments').post(bulkLoanPay)
module.exports = router
