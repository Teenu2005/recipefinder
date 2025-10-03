import {React, useState,useEffect} from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Types() {
  const [categories,setCategories] = useState([]);
  const nav = useNavigate();
  useEffect(
    ()=>{getapi()}
    ,[]
  )
  async function getapi() {
    try{
   await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(res => res.json())
  .then(data => {
    console.log(data.categories); 
   setCategories(data.categories); 
  })
}
    catch(err){
      console.log(err)
    }
  }
 function getitems(e){
    nav(`/items/${categories[e.target.id].strCategory}`)
 }

  return (
    <>
    <Container fluid className='catmain'>
      <h3>Top Categories</h3>
      <Row md={3} lg={5}>
        {categories.map(
          (value,index)=>{
             return <Col sm md={3} key={index}>
                <Card id={index} onClick={getitems} >
                  <Card.Img id={index} src={value.strCategoryThumb} />
                  <Card.Header id={index}>{value.strCategory}</Card.Header>
                </Card>
              </Col>
          }
        )}
      </Row>
    </Container>
    </>
  )
}

export default Types 