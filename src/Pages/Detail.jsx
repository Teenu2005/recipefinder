import { useState, useEffect } from "react";
import { ListGroup, Badge, Container} from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Detail() {
  const [item, setItem] = useState({});
  const { id } = useParams();
console.log(item)
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
  let vare = item.strYoutube||''
  let newone = vare.split('/')
  return (
    <>
      <Container fluid>
        <h3>{item.strMeal}</h3>
        <img src={item.strMealThumb} alt="Dish Img" />
        <p>{item.strInstructions}</p>
        <ol>
        {ingredients.map(
          (val,index)=>{
            let ing =val.split(':')
            return<li key={index}>{ing[0]}</li>
          }
        )}</ol>
      </Container>
    </>
  );
}

{/* <iframe src={`${newone[0]}//${newone[2]}/embed/${newone[3]}`}></iframe> */}