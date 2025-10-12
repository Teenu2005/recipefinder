import {React, useState,useEffect} from 'react'
import {Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";

function Dishgrid(prop) {
  const [categories,setCategories] = useState([]);
  const Place = prop.Place;
  const nav = useNavigate();
  useEffect(
    ()=>{getapi()}
    ,[]
  )
  async function getapi() {
    try{
   await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Place}`)
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
    <Container id='grid_contanier' fluid>
        {categories.map(
          (value,index)=>{
            return<div key={index} id={index} onClick={getitems} className={`grid_child_${index+1}`}>
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

export default Dishgrid; 