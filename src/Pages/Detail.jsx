import { useState, useEffect } from "react";
import { ListGroup, Badge } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getapi();
  }, []);

  async function getapi() {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await res.json();
      setItem(data.meals[0]);
    } catch (err) {
      console.log(err);
    }
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = item[`strIngredient${i}`];
    const measure = item[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure}:${ingredient}`);
    }
  }
console.log(item)
  return (
    <>
    <h3>{item.strMeal}</h3>
    <p>{item.strInstructions}</p>
    <iframe src={item.strYoutube}></iframe>
    <img src={item.strMealThumb} alt="Dish Img" />
    <ListGroup as="ol" numbered>
      {ingredients.map((val, index) => {
        let vals = val.split(':')
        return <ListGroup.Item
          as="li"
          key={index}
          className="d-flex align-items-start"
        >
          <div className="ms-2 me-auto">
            <div className="fw-bold">{vals[1]}</div>
          </div>
          <Badge pill>
            {vals[0]}
          </Badge>
        </ListGroup.Item>
})}
    </ListGroup>
    </>
  );
}
