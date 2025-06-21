const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors  = require('cors')
//import routers
const accountRouter = require('./routes/account');
const transactionRouter = require('./routes/transaction')
const loanRouter = require('./routes/loan')
const {connectToDb} = require('./db/mongo');

connectToDb();
const app = express();

//use routes middleware
app.use(cors({origin:process.env.CLIENT_URI}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/api',accountRouter);
app.use('/api',transactionRouter);
app.use('/api',loanRouter)

// app.use(cors())
const port = process.env.PORT

app.listen(port, () => console.log(`App is running on port ${port}`))