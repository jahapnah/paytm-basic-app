import { useState, useEffect } from "react";
import axios from "axios";



export const Balance = ({ value }) => {
    const [ balance, setBalance ] = useState(0);
    const token = localStorage.getItem("token");
    console.log(token);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`http://localhost:3000/api/v1/account/balance`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setBalance(response.data.balance);
        }
        fetchData();

        const fetchAtInterval = setInterval(fetchData, 2000);
        return ()=>{
            clearInterval(fetchAtInterval)
        }
        
    }, [])
    

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}