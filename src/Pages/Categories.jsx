import {React, useState,useEffect} from 'react'
import { Col,Row,Card,Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../service/Api';

function Categories() {
  const [categories,setCategories] = useState([]);
  const nav = useNavigate();
  useEffect(
    ()=>{
      // async function to get the result from api using fetchData function declared in aip.js in service folder
      async function get(){
        const data = await fetchData(`categories.php`)
        setCategories(data.categories)
      }
      get();
    }
    ,[]
  )

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