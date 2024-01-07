import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth'
import { Link } from "react-router-dom"

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();

    // When the component mounts, get all users and their information.
    const getAllUsersData = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/admin/users", {
                method: "GET",
                headers:{
                    Authorization : authorizationToken
                }
            });

            const data = await response.json();
            console.log(`Users ${data}`)
            setUsers(data);
        } catch (error) {
            console.log(error)
        }
    }

    // Delete user
    const deleteUser = async(id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/user/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization : authorizationToken
                }
            });

            const data = await response.json();
            console.log(`User after delete ${data}`);

            if(response.ok){
                getAllUsersData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getAllUsersData();
    },[])


  return (
    <>
        <section className='admin-users-section'>
            <div className="container">
                <h1>Admin Users Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email Address</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((currUser)=>{
                        return <tr key={currUser._id}>
                            <td>{currUser.username}</td>
                            <td>{currUser.email}</td>
                            <td>{currUser.phone}</td>
                            <td><Link to={`/admin/user/edit/${currUser._id}`}>Edit</Link></td>
                            <td><button onClick={()=> deleteUser(currUser._id)}>Delete</button></td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </section>
    </>
  )
}

export default AdminUsers