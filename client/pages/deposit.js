import {useState} from 'react'
import Layout from "../components/Layout";
import axios from 'axios';
const Deposit = () => {

    const [state,setState] = useState({
        accountNumber:'',
        amount:'',
        date:'',
        description:'',
        success:'',
        error:'',
        buttonText:'Deposit'

    })

    const {accountNumber,amount,date,description,success,error,buttonText} = state;

    const handleChange = (name)=>(e)=>{
        //spread the whole state, capture the event values, ovrride others
        setState({...state,[name]:e.target.value,success:'',error:'',buttonText:'Depositing'})
    }

    const handleSubmit = (e)=>{
        //
        e.preventDefault();
        axios.
        patch(`http://localhost:8000/api/deposit/6854359f1171b045c50ce40c`,{
            accountNumber,amount,date,description
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
        console.table({accountNumber,amount,date,description})

    }

    const makeDeposit = () => (
        <form onSubmit={handleSubmit}>
           <div className="form-group">
            <input value={accountNumber} onChange={handleChange('accountNumber')} type="text" className="form-control" placeholder="Enter account number"/>
           </div>
           <div className="form-group">
            <input value={amount} onChange={handleChange('amount')} type="number" className="form-control" placeholder="Enter amount"/>
           </div>
           <div className="form-group">
            <input value={date} onChange={handleChange('date')} type="date" className="form-control"/>
           </div>
           <div className="form-group">
            <input value={description} onChange={handleChange('description')} type="text" className="form-control" placeholder="Enter description"/>
           </div>
           <div className="form-group">
            <button className="btn btn-outline-info">{buttonText}</button>
           </div>
        </form>
    )

    return (
        <Layout>
            <div className="col-md-6 offset-md-3">
            <h1>Deposit cash to an account</h1>
            {makeDeposit()}
            <br/>
            {JSON.stringify(state)}
            <hr/>
            </div>
            
        </Layout>
    )
};

export default Deposit;