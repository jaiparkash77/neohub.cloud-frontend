import React, { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';

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

  // Delete Contact
  const deleteContact = async(id)=>{
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken
        }
      });

      const data = await response.json();
      console.log(`Contacts after delete ${data}`);

      if(response.ok){
        getAllContactsData();
        toast.success("Contact Deleted Successfully");
      }else{
        toast.error("Error while deleting contact")
      }

    } catch (error) {
      
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
                  <button className='btn' onClick={()=> deleteContact(_id)}>Delete</button>
                </div>
            })}
          </div>
      </section>
    </>
  )
}

export default AdminContacts