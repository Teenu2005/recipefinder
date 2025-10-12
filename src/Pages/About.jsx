import React from 'react'
import img from '../assets/cookimg.png'
export default function About() {
  return (
    <div className='container-fluid'>
    <div className='mainpage row'>
        <main className='heading col-sm-7 p-5'> 
            <h1>Hi I'm Teenu Anand</h1>
            <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam, eos!</h5>
            <div className="btn-grp">
            </div>
        </main>
        <div className="imgs col-sm-5">
               <img id='homeimg' src={img} alt="" />
        </div>
        </div>
    </div>
  )
}
