import {React, useState,useEffect} from 'react'
import {Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { fetchData } from '../service/Api';

function Dishgrid(prop) {
  // adding env for best practice
  const [categories,setCategories] = useState([]);
  const Place = prop.Place;
  const nav = useNavigate();
  useEffect(
    ()=>{
      // async function to get the result from api using fetchData function declared in aip.js in service folder
      async function getApiResult(){
      const data = await fetchData(`/filter.php?a=${Place}`)
      setCategories(data.meals.slice(0,5));
    }
    getApiResult();
    }
    ,[]
  )
  // navigate to Native dish component
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