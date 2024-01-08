import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken } = useAuth();

  // When the component mounts, get all users and their information.
  const getAllContactsData = async()=>{
      try {
          const response = await fetch("http://localhost:5000/api/admin/contacts", {
              method: "GET",
              headers:{
                  Authorization : authorizationToken
              }
          });

          const data = await response.json();
          console.log(`Contects ${data}`)
          if(response.ok){
            setContacts(data);
          }
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(()=>{
      getAllContactsData();
  },[])

  return (
    <>
      <section className='admin-contacts-section'>
          <div className="container">
              <h1>Admin Contacts Data</h1>
          </div>
          <div className="container admin-users">
            {contacts.map((contact)=>{
              const {_id, username, email, message} = contact;
                return <div key={_id}>
                  <p>{username}</p>
                  <p>{email}</p>
                  <p>{message}</p>
                  <button className='btn'>Delete</button>
                </div>
            })}
          </div>
      </section>
    </>
  )
}

export default AdminContacts