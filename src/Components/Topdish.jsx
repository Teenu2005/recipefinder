import {React, useState,useEffect} from 'react'
import {Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { fetchData } from '../service/Api';

// for home page scrolleable component
function Topdish(prop) {
  const [categories,setCategories] = useState([]);
  const Place = prop.Place;
  const nav = useNavigate();
  useEffect(
    ()=>{
      // async function to get the result from api using fetchData function declared in aip.js in service folder
      async function getApiResult(){
      const data = await fetchData(`filter.php?a=${Place}`)
      setCategories(data.meals.slice(0,5));
    }
    getApiResult();
    }
    ,[]
  )

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
            return<div id={index} key={index} onClick={getitems} className='home_component_div'>
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