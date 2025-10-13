import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TiHeartFullOutline } from "react-icons/ti";

function Nativedish() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const totalCard = 10;
  const Place = useParams() || "";
  useEffect(() => {
    getApiResult();
  }, []);

  // Api call
  async function getApiResult() {
    try {
      await fetch(`${API_URL}filter.php?a=${Place.place}`)
        .then(res => res.json())
        .then(data => setItems(data.meals));
    } catch (err) {
      console.log(err);
    }
  }

  // for pagenation calculate the following value
  let startIndex = (page - 1) * totalCard;
  let endIndex = startIndex + totalCard;
  let current = items.slice(startIndex, endIndex);

  // making a array with specified value
  const arr = Array.from({ length: Math.ceil(items.length / totalCard) }, (_, i) => i + 1);

  // navigate to detail page
 function getitems(e){
    nav(`/item/${items[e.target.id].idMeal}`)
 }
  return (
    <Container fluid className="Card_Contanier">
      <h3>{Place.place}</h3>
      <Row md={3} lg={4}>
        {current.map((value, index) => (
          <Col sm={2} key={index}>
            <Card className="itemcard" id={index} onClick={getitems}>
              {/* <TiHeartFullOutline onClick={markLike} id='heart_icon'/> */}
              <Card.Img id={index} src={value.strMealThumb} />
              <Card.Text id={index}>{value.strMeal}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Buttons */}
      <div className="pageno ">
        <button 
          onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
          style={page==1?{ display: 'none'}:null}
        >
          &larr; Prev
        </button>

        {arr.map((num) => (
          <button 
            key={num} 
            className={num === page ? "selected" : "notselected"}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}

        <button 
          onClick={() => setPage(prev => (prev < arr.length ? prev + 1 : prev))}
          style={page==arr.length?{ display: 'none'}:null}
        >
          &rarr; Next
        </button>
      </div>
    </Container>
  );
}

export default Nativedish;
