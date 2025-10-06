import React from 'react'
import img from '../assets/cookimg.png'
import About from './About'
import Types from './Types'
function Home() {
  return (
    <>
    <div className='container-fluid'>
    <div className='mainpage row'>
        <main className='heading col-sm-7 p-5'> 
            <h1>Find the Perfect Recipe for Every Mood!</h1>
            <h5>Discover delicious recipes tailored to your taste, ingredients, and lifestyle</h5>
            <div className="btn-grp">
            </div>
        </main>
        <div className="imgs col-sm-5">
               <img id='homeimg' src={img} alt="" />
        </div>
        </div>
    </div>
    </>
  )
}

export default Home