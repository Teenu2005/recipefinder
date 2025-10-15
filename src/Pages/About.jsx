// import React from 'react'
// import img from '../assets/cookimg.png'
// export default function About() {
//   return (
//     <div className='container-fluid'>
//     <div className='mainpage row'>
//         <main className='heading col-sm-7 p-5'> 
//             <h1>Hi I'm Teenu Anand</h1>
//             <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, eos!</h5>
//             <div className="btn-grp">
//             </div>
//         </main>
//         <div className="imgs col-sm-5">
//                <img id='homeimg' src={img} alt="" />
//         </div>
//         </div>
//     </div>
//   )
// }
import React, { useState } from 'react';
import img from '../assets/cookimg.png';

export default function About() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for joining, ${email}! We’ll reach out soon.`);
    setEmail('');
  };

  return (
    <div className="container-fluid about-page p-5">
      <div className="row align-items-center mainpage">
        <main className="col-md-6 p-4"  >
          <h1 className="fw-bold"> Hi, I'm Teenu Anand</h1>
          <p className="lead mt-3">
            Welcome to <strong>CookBook</strong> — a place where flavors meet creativity!
            I built this platform to make exploring global cuisines simple and fun.
            You can discover, save, and even learn with AI assistance to make every
            cooking experience smarter and easier.
          </p>
         
         
        </main>

        <div className="about_form_contanier col-md-6 text-center">
          <div className="about_form">
          <h3 className="mt-4 text-success h-4"> Join Our Foodie Community</h3>
          <p>Share your favorite recipes with us and be featured on our page!</p>

          <form onSubmit={handleSubmit} className="d-flex gap-2 mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control w-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="home_btn btn btn-success">Join Community</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
