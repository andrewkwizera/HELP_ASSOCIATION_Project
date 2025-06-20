const express = require('express')
const {withdraw,getAllTransactions, deposit} = require('../controllers/transactions')

const router = express.Router();

router.route('/transaction').get(getAllTransactions)
router.route('/deposit/:accountNumber').patch(deposit)
router.route('/withdraw/:accountNumber').patch(withdraw)
module.exports = router
