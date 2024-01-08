import React from 'react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { FaHome, FaRegListAlt, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from '../../store/auth';

const AdminLayout = () => {
    const {user, isLoading} = useAuth();
    console.log("user on admin layout", user);

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(!user.isAdmin){
        return <Navigate to={"/"} />
    }

  return (
    <>
        <header>
            <div className="container">
                <nav>
                    <ul>
                        <li><NavLink to={"/admin/users"}><FaUser /> Users</NavLink></li>
                        <li><NavLink to={"/admin/contacts"}><FaMessage /> Contacts</NavLink></li>
                        <li><NavLink to={"/services"}><FaRegListAlt /> Services</NavLink></li>
                        <li><NavLink to={"/"}><FaHome /> Home</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>   
        <Outlet /> 
    </>
  )
}

export default AdminLayout