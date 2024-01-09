import React, { useState } from 'react'
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

const Contact = () => {
  const [contact, setContact] = useState(defaultContactFormData);

  const [userData, setUserData] = useState(true);

  const {user} = useAuth();

  if(userData && user){
    setContact({
      username: user.username,
      email: user.email,
      message: ""
    });

    setUserData(false);
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contact),
      })
      if(response.ok){
        setContact(defaultContactFormData);  
        const data = await response.json(); 
        toast.success("Submission successful. We will contact you soon.")
      }
    } catch (error) {
      console.log("Contact Page error ", error)
    }
  };

  return (
    <>
      <section className="section-contact">
          <div className='contact-content container'>
            <h1 className="main-heading">Contact Us</h1>
          </div>
          {/* Contact page main */}
          <div className="container grid grid-two-cols">
            <div className="contact-img">
              <img
                src="/images/support.png"
                alt="We are always ready to help"
              />
            </div>
            {/* Main contact form code  */}
            <section className="section-form">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={contact.username}
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
                    value={contact.email}
                    onChange={handleInput}
                    placeholder="email"
                    id='email'
                    autoComplete='off'
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message">Message</label>
                  <textarea 
                    name="message" 
                    id="message" 
                    cols="30" 
                    rows="6" 
                    autoComplete='off'
                    value={contact.message}
                    onChange={handleInput}
                     required></textarea>
                </div>

                <div>
                  <button type="submit" className="btn btn-submit">
                    Send
                  </button>                  
                </div>
                
              </form>
            </section>
          </div>

          <section className='mb-3'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62209.82204169458!2d77.69524660213969!3d12.964564247899558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae11f35d0dfc83%3A0x30cfa512d80115f9!2sWhitefield%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703423531402!5m2!1sen!2sin" width="100%" height="450" style={{border: "0px"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </section>
      </section>
    </>
  )
}

export default Contact