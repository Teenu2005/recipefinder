import img from '../assets/cookimg.png'
import About from './About'
import Topdish from '../Components/Topdish'
import Dishgrid from '../Components/Dishgrid'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
function Home() {
  const nav = useNavigate();
  const [random,setRandom] = useState([]);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // make api call for randome generation
  useEffect(()=>{
    getApiResult();}
    ,[])

  async function getApiResult() {
    try {
      await fetch(`${API_URL}random.php`)
        .then(res => res.json())
        .then(data => setRandom(data.meals));
    } catch (err) {
      console.log(err);
    }
  }

  // function to navigate to randome ly gnerated dishes
  function navgationToRandom(){
    nav(`/item/${random[0].idMeal}`)
  }

  return (
    <>
    <div id='home' className='container-fluid'>
    <div className='mainpage row'>
        <main className='heading col-sm-7 p-5'> 
            <h1>Find the Perfect Recipe for Every Mood!</h1>
            <h5>Discover delicious recipes tailored to your taste, ingredients, and lifestyle</h5>
            <div className="btn_grp">
              <button onClick={()=>{nav('/categories')}} className='home_btn'>Get Started</button>
              <button onClick={navgationToRandom} className='home_btn'>Try Something New</button>
            </div>
        </main>
        <div className="imgs col-sm-5">
               <img id='homeimg' src={img} alt="" />
        </div>
        </div>
    </div>
    {/* adding all component that will apper in landing page */}
    <Dishgrid Place='American'/>
    <Topdish Place='Canadian'/>
    <Dishgrid Place='Indian'/>
    </>
  )
}

export default Home