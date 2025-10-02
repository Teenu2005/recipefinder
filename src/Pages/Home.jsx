import React from 'react'
import img from '../assets/cookimg.png'
function Home() {
  return (
    <>
    <div className='mainpage'>
        <main className='heading'> 
            <h1>Find the Perfect Recipe for Every Mood!</h1>
            <h5>Discover delicious recipes tailored to your taste, ingredients, and lifestyle</h5>
        </main>
        <div className="imgs">
               <img src={img} alt="" />
        </div>
        </div>
    </>
  )
}

export default Home