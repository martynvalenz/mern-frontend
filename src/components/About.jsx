import React from 'react'

export const About = () => {
  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6">
              <img src="/assets/about1.png" alt="About" className="w-75 mt-1" />
            </div>
            <div className="col-md-6">
              <h3 className="fs-5 mb-0">About Us</h3>
              <h1 className="display-6 mb-2">Who <b>We</b> Are</h1>
              <hr className="w-50" />
              <p className="lead mb-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, culpa est quaerat commodi eius voluptatem repellendus velit nobis praesentium harum consequuntur eveniet odit pariatur reprehenderit repellat officiis impedit obcaecati possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam optio ipsum, eius obcaecati aut eos nostrum blanditiis, quod, tempore magnam deleniti veritatis cumque natus repellendus.</p>
              <button className="btn btn-primary rounded-pill px-4 py-2">Get Started</button>
              <button className="btn btn-outline-primary rounded-pill px-4 py-2 ms-2">Contact Us</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
