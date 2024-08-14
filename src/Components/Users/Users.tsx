import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import './Users.css'
import image1 from '../Images/image1.jpg';

const Users = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getAllUsers = async () => {
            setIsLoading(true)
            const res = await fetch('https://jsonplaceholder.typicode.com/users',
                { method: 'Get' });
            const data = await res.json();
            setAllUsers(data);
            setIsLoading(false);
        };
        getAllUsers();
    }, []);


    return (
        <div className="users-container">
            <h1>All Users</h1>
            {
                isLoading ? (
                    <CircularProgress className="loading" />
                ) : (

                    <div className="users-grid">
                        {allUsers.map((user: { id: number; name: string; username: string, email: string }) => (
                            <div className="user-box">
                                <div key={user.id} className="user">
                                    <h3 className="user-name">{user.name}</h3>
                                    <p>{user.username}</p>
                                    <p>{user.email}</p>
                                </div>
                                <img className='imv' src={image1} />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export { Users };