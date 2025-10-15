import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TiHeartFullOutline } from "react-icons/ti";
import { FavListContext } from '../Context/FavouriteContect';
import { fetchData } from '../service/Api';

function Subcatogries() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { likedDishList, updateList, addFav } = useContext(FavListContext);
  const nav = useNavigate();
  const totalCard = 12;
  const categorie = useParams() || "";
  useEffect(() => {
    // async function to get the result from api using fetchData function declared in aip.js in service folder
    async function getApiResult(){
      const data = await fetchData(`/filter.php?c=${categorie.id}`)
      setItems(data.meals);
    }
    getApiResult();
  }, []);

  useEffect(() => {
    likeMarkerFun(likedDishList);
  }, [items, likedDishList]);

  let startIndex = (page - 1) * totalCard; //start index for find each pagage starting itme 
  let endIndex = startIndex + totalCard; // end index for find last item of the page
  let current = items.slice(startIndex, endIndex); // its to maintain list for current page from orginal list

  // create new arra based on the number of page for adding buttons 
  const arr = Array.from({ length: Math.ceil(items.length / totalCard) }, (_, i) => i + 1);

  // call to detail component
  function getitems(e) {
    nav(`/item/${items[e.target.id].idMeal}`)
  }

  // it is to marke liked dish when the page is loaded
  const likeMarkerFun = (likedDishList) => {
    likedDishList.forEach(element => {
      const heartIcon = document.getElementById(element);
      if (heartIcon) {
        heartIcon.classList.add('liked')
      }
    });
  }

  // this is for hande like and dislke button
function markLike(e) {
  const dishId = e.currentTarget.id;
  if (e.currentTarget.classList.contains('liked')) {
    e.currentTarget.classList.remove('liked')
    updateList(dishId);
  } else {
    e.currentTarget.classList.add('liked');
    addFav(dishId);
  }
}

  return (
    <Container fluid className="Card_Contanier">
      <h3>{categorie.id}</h3>
      <Row md={3} lg={4}>
        {current.map((value, index) => (
          <Col sm={2} key={index}>
            <Card className="itemcard">
              <TiHeartFullOutline onClick={markLike} id={value.idMeal} className={`heart_icon ${likedDishList.includes(value.idMeal) ? 'liked' : ''}`} />
              <Card.Img src={value.strMealThumb} onClick={() => getitems({ target: { id: index } })} />
              <Card.Text>{value.strMeal}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pageno ">
        <button onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))} style={page == 1 ? { display: 'none' } : null} >
          &larr; Prev
        </button>
        {arr.map((num) => (
          <button key={num} className={num === page ? "selected" : "notselected"} onClick={() => setPage(num)} >
            {num}
          </button>
        ))}
        <button onClick={() => setPage(prev => (prev < arr.length ? prev + 1 : prev))} style={page == arr.length ? { display: 'none' } : null} >
          &rarr; Next
        </button>
      </div>
    </Container>
  );
}

export default Subcatogries;