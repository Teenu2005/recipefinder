import {React, useState,useEffect} from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';

function Types() {
  const [categories,setCategories] = useState([]);
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
  return (
    <>
    <Container fluid className='catmain'>
      <Row md={4}>
        {categories.map(
          (value,index)=>{
             return <Col  key={index}>
                <Card>
                  <Card.Img src={value.strCategoryThumb} />
                  <Card.Header>{value.strCategory}</Card.Header>
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