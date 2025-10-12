import { useState, useEffect } from "react";
import { ListGroup, Badge, Container} from "react-bootstrap";
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
  let vare = item.strYoutube||''
  let newone = vare.split('/')
  return (
    <>
      <Container fluid className="Card_Contanier_detail">
        <h3>{item.strMeal}</h3>
        <div className="Card_Contanier_detail_inner">
        <p>{item.strInstructions}</p>
          <div className="d-flex flex-column">
          <img src={item.strMealThumb} alt="Dish Img" class="img-thumbnail"/>
        <table class="table table-hover">
          <tr>
          <th>Ingredient</th>
          <th>Quantity</th>
          </tr>
        {ingredients.map(
          (val,index)=>{
            let ing =val.split(':')
            return<tr key={index}>
              <td>{ing[1]}</td>
              <td>{ing[0]}</td>
            </tr>
          }
        )}</table>
        </div>
        </div>
           <iframe src={`${newone[0]}//${newone[2]}/embed/${newone[3]}`}></iframe> 
        
      </Container>
    </>
  );
}

{/* <iframe src={`${newone[0]}//${newone[2]}/embed/${newone[3]}`}></iframe> */}