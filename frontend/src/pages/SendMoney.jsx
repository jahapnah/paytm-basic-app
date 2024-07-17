import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const SendMoney = () => {

  const [searchParams] = useSearchParams();
  const toName = searchParams.get("name");
  const [ transactionMsg, setTransactionMsg ] = useState("")
  
  const [amount, setAmount ] = useState(null);
  const to = searchParams.get("id");
  
  useEffect(() => {
    if(transactionMsg){
      let timeOut = setTimeout(() => {
        setTransactionMsg("");
      }, 2000)

    }
  })
  const submitHandler = async () => {

    if(!amount){
      setTransactionMsg("Please enter an amount to proceed");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/v1/account/transfer`,{
        to,
        amount
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      setTransactionMsg(response.data.message);
    } catch(err){
      setTransactionMsg("Error in transferring money")
    }
  }

  return <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
          <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
              <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div className="p-6">
              <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span className="text-2xl text-white">A</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{toName}</h3>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">

                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                      Amount (in Rs)
                    </label>

                    <input onChange={(e) => setAmount(e.target.value)} type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" id="amount" placeholder="Enter amount"/>

                  </div>

                  <button onClick={submitHandler} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                      Initiate Transfer
                  </button>
                  <div className="text-sm text-red-600 pl-2">{transactionMsg}</div>
              </div>
              </div>
      </div>
    </div>
  </div>
}

export default SendMoney;