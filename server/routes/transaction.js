const express = require('express')
const {withdraw,getAllTransactions, deposit,bulkDeposit} = require('../controllers/transactions')

const router = express.Router();

router.route('/transaction').get(getAllTransactions)
router.route('/deposit/:accountNumber').post(deposit)
router.route('/withdraw/:accountNumber').post(withdraw)
router.route('/bulk-deposit').post(bulkDeposit)
module.exports = router
