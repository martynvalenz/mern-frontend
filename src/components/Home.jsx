import React from 'react'
import { About } from './About';
// import { Services } from './Services';
// import { Contact } from './Contact';

export const Home = () => {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">Welcome to the users dashboard</h1>
              <p className="lead text-center fs-4 mb-5 text-white">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis nisi illum quisquam quas ipsum, ipsam id magnam tempora eius provident neque repellendus mollitia, voluptas optio perferendis quam. Maiores, officia molestiae.</p>
              <div className="buttons d-flex justify-content-center">
                <button className="btn btn-light me-4 rounded-pill px-4 py-2">Get Quote</button>
                <button className="btn btn-outline-light me-4 rounded-pill px-4 py-2">Our Services</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <About/>
      {/* <Services/>
      <Contact/> */}
    </div>
  )
}
