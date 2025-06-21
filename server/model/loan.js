const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
    accountNumber:{
        type:String,
    },
    loanAmount:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    description: {
        type:String,
    },
    installmentAmount:{
        type: Number
    },
    interestRate: {
        type: Number,
        default:1
    },
    loanTearm:{
        type: String,
        default: '1 year'
    }
},
{timestamps:true}
);

module.exports = mongoose.model('Loan',LoanSchema)