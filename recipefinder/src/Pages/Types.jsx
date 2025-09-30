import React, { useEffect, useState } from "react";
import { Card , Row,Col} from "react-bootstrap";

function Types() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  console.log(categories);

  return (
    <div className="catmain">
      <Row>
      {categories.map((val, index) => (
        <Col sm>
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Img variant="top" src={val.strCategoryThumb} />
          <Card.Body>
            <Card.Title>{val.strCategory} <button className="likebut"><span class="material-symbols-outlined">favorite</span></button></Card.Title> 
          </Card.Body>
        </Card>
        </Col>
      ))}
      <Col>
      </Col>
      </Row>
    </div>
  );
}

export default Types;
