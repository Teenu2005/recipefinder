import {React, useState,useEffect} from 'react'
import {Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
// for home page scrolleable component
function Topdish(prop) {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories,setCategories] = useState([]);
  const Place = prop.Place;
  const nav = useNavigate();
  useEffect(
    ()=>{getapi()}
    ,[]
  )
  async function getapi() {
    try{
   await fetch(`${API_URL}filter.php?a=${Place}`)
  .then(res => res.json())
  .then(data => {
   let spliced = data.meals;
   setCategories(spliced.slice(0,5));
  })
}
    catch(err){
      console.log(err)
    }
  }
 function getitems(e){
    nav(`/item/${categories[e.target.id].idMeal}`)
 }

  return (
    <>
    <Container fluid className='home_component_top'>
      <div className="nav_cat">
            <h3>{Place}</h3>
            <a  href={`/native/${Place}`}><FaChevronRight /></a>
            </div>
    <Container fluid className='home_component'>
        {categories.map(
          (value,index)=>{
            return<div id={index} onClick={getitems} className='home_component_div'>
                  <Card.Img id={index} src={value.strMealThumb} className='home_component_img'/>
                  <h3 className='home_component_head' id={index}>{value.strMeal}</h3>
                </div>
          }
        )}
    </Container>
    </Container>
    </>
  )
}

export default Topdish 