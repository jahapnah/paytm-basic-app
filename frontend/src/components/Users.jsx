import { useEffect, useState } from "react"
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Users = () => {

    const [users, setUsers] = useState([]);
    const [ filter, setFilter ] = useState("");
    const [ debouncedFilter, setDebouncedFilter ] = useState("");

    async function fetchUsers() {
        const response = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${debouncedFilter}`)
        setUsers(response.data.user);
    }


    useEffect(() => {
        const debouncedHandler = setTimeout(() => {
            setDebouncedFilter(filter);
        }, 500)

        return () => {
            clearTimeout(debouncedHandler);
        }
    }, [filter]);

    useEffect(() => {
        try {
            fetchUsers();
        }
        catch(err) {
            console.log("Error in fetching users data");
        }
    }, [debouncedFilter])

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
            setFilter(e.target.value);
            console.log(filter);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map((user, index) => <User key={index} user={user} />)}
        </div>
    </>
}

function User({user}) {

    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onPress={(e) => {
                console.log("Navigating to send");
                navigate(`/send?id=${user._id}&name=${user.firstName}`)
            }} label={"Send Money"} />
        </div>
    </div>
}