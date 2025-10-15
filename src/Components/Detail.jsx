import { useState, useEffect } from "react";
import { ListGroup, Badge, Container} from "react-bootstrap";
import { useParams,useNavigate } from "react-router-dom";
import img from '../assets/Ai_png.png'
import {fetchData} from '../service/Api'

export default function Detail() {
  // this is to show all the detail of the recipe 
  const [item, setItem] = useState({});
  const { id } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    // async function to get the result from api using fetchData function declared in aip.js in service folder
    async function getApiResult(){
      const data = await fetchData(`/lookup.php?i=${id}`)
      setItem(data.meals[0]);
    }
    getApiResult();
  }, []);


  // for supperating the ingredient and its quantity details from the result 
  // also get each ingedient from responce and make a new list so it easy to apply map 
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
        <h3>{item.strMeal}</h3> <button className="ai_btn" onClick={()=>{nav(`/Aihelper/${item.idMeal}`)}}><img src={img} /><p>Ask..</p></button>
        <div className="Card_Contanier_detail_inner">
        <div className="ifram_p_divider">
        <p>{item.strInstructions}</p>
        <iframe src={`${newone[0]}//${newone[2]}/embed/${newone[3]}`}></iframe>
        </div>
          <div className="d-flex flex-column">
          <img src={item.strMealThumb} alt="Dish Img" className="img-thumbnail"/>
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
            
        
      </Container>
    </>
  );
}
