import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/auth';


const AdminUpdate = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: ""
  });

  const params = useParams();
  console.log(params)
  const { authorizationToken } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData({
      ...data,
      [name]: value,
    });
  };

  // Get single user data
  const getSingleUserData = async()=>{
    try {
      const response = await fetch(`http://localhost:5000/api/admin/user/${params.id}`, {
          method: "GET",
          headers:{
              Authorization : authorizationToken
          }
      });

      const data = await response.json();
      console.log(`User data ${data}`);
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getSingleUserData();

  },[])

  return (
    <>
      <section className="section-contact">
          <div className='contact-content container'>
            <h1 className="main-heading">Update User</h1>
          </div>
          {/* Contact page main */}
          <div className="container grid grid-two-cols">
            
            {/* Main contact form code  */}
            <section className="section-form">
              <form>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={data.username}
                    onChange={handleInput}
                    placeholder="Username"
                    id='username'
                    autoComplete='off'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleInput}
                    placeholder="Email"
                    id='email'
                    autoComplete='off'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone">Mobile</label>
                  <input
                    type="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInput}
                    placeholder="Phone"
                    id='phone'
                    autoComplete='off'
                    required
                  />
                </div>

                <div>
                  <button type="submit" className="btn btn-submit">
                    Update
                  </button>                  
                </div>
                
              </form>
            </section>
          </div>
      </section>
    </>
  )
}

export default AdminUpdate