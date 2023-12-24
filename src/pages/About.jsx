import React from 'react'
import Analytics from '../components/Analytics'

const About = () => {
  return (
    <>
      <main>
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <p>Welcome to NeoHub</p>
              <h1>Why choose us?</h1>
              <p>
                Experties: Our team consists of experienced IT professionals who are passianate about staying up-to-date with latest industry trends.
                <br />
                <br />
                Customization: We understand that every business is unique. That's why we create solutions that are tailored to your specific needs and goals.
                <br /><br />
                Customer-Centric Approach: We prioritize your satisfaction and provide top-notch support to address your IT concerns.
                <br /><br />
                Affordability: We offer competitive pricing without compromising on the quality of our services. 
                <br /><br />
                Reliability: Count on us to be there when you need us. We're committed to ensure you IT environment is realible and available 24/7. 
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>

            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/home.png"
                alt="coding together"
                width="400"
                height="500"
              />
            </div>
          </div>
        </section>
      </main>

      {/* 2nd section  */}
      <Analytics />

      
    </>
  )
}

export default About