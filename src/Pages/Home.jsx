import img from '../assets/cookimg.png'
import Topdish from '../Components/Topdish'
import About from './About'
import Dishgrid from '../Components/Dishgrid'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchData } from '../service/Api'
function Home() {
  const nav = useNavigate();
  const [random,setRandom] = useState([]);

  // make api call for randome generation
  useEffect(()=>{
    // async function to get the result from api using fetchData function declared in aip.js in service folder
    async function getApiResult(){
      const data = await fetchData(`random.php`);
      setRandom(data.meals);
    }
    getApiResult();
  }
    ,[])


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
    <hr />
    <Topdish Place='Canadian'/>
    <hr />
    <Dishgrid Place='Indian'/>
    <hr />
    <About />
    <hr />
    </>
  )
}

export default Home