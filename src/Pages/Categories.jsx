import {React, useState,useEffect} from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Categories() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [categories,setCategories] = useState([]);
  const nav = useNavigate();
  useEffect(
    ()=>{getApiResult()}
    ,[]
  )
  async function getApiResult() {
    try{
   await fetch(`${API_URL}categories.php`)
  .then(res => res.json())
  .then(data => {
   setCategories(data.categories); 
  })
}
    catch(err){
      console.log(err)
    }
  }
 function getItems(e){
    nav(`/items/${categories[e.target.id].strCategory}`)
 }

  return (
    <>
    <Container fluid className='Card_Contanier'>
      <h3>Top Categories</h3>
      <Row md={3} lg={5}>
        {categories.map(
          (value,index)=>{
             return <Col sm md={3} key={index}>
                <Card id={index} onClick={getItems} >
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

export default Categories;