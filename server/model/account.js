const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountNumber:{
        type:String,
        required:true,
        min: 6,
        max: 6,
        unique: true,
        index: true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    balance: {
        type:Number,
        default:0,
    },
    loanBalance:{
        type:Number,
        default:0
    }
    
},
{timestamps:true}
);

module.exports = mongoose.model('Account',AccountSchema)