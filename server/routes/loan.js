const express = require('express')
const {requestLoan,payLoan} = require('../controllers/loans')

const router = express.Router();

router.route('/loan').post(requestLoan)
module.exports = router
