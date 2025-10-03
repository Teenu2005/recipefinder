import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Display() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const nav = useNavigate();
  const totalCard = 10;
  const cat = useParams() || "";
  console.log(cat)
  useEffect(() => {
    getapi();
  }, []);

  async function getapi() {
    try {
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.id}`)
        .then(res => res.json())
        .then(data => setItems(data.meals));
    } catch (err) {
      console.log(err);
    }
  }

  // Pagination calculations
  let startIndex = (page - 1) * totalCard;
  let endIndex = startIndex + totalCard;
  let current = items.slice(startIndex, endIndex);

  // Total pages array
  const arr = Array.from({ length: Math.ceil(items.length / totalCard) }, (_, i) => i + 1);

 function getitems(e){
    nav(`/item/${items[e.target.id].idMeal}`)
 }

  return (
    <Container fluid className="catmain">
      <h3>{cat.id}</h3>
      <Row md={3} lg={4}>
        {current.map((value, index) => (
          <Col sm={2} key={index}>
            <Card className="itemcard" id={index} onClick={getitems}>
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

export default Display;
