import { React, useState, useEffect } from 'react';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { fetchDatas } from '../service/Api';

function Dishgrid({ Place }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function getApiResult() {
      try {
        const pageNumber = 1;
        const pageSize = 5; // show 5 recipes in the grid
        const data = await fetchDatas(`/recipeBook/recipe/Search/area?area=${Place}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
        setRecipes(data.items || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    }
    getApiResult();
  }, [Place]);

  // Navigate to recipe detail page
  function goToRecipe(id) {
    nav(`/item/${id}`);
  }

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (!recipes.length) return <p>No recipes found for {Place}.</p>;

  return (
    <Container fluid className='home_component_top'>
      <div className="nav_cat">
        <h3>{Place}</h3>
        <a href={`/native/${Place}`}><FaChevronRight /></a>
      </div>

      <Container id='grid_contanier' fluid>
        {recipes.map((recipe, index) => (
          <div key={recipe.recipeId} onClick={() => goToRecipe(recipe.recipeId)} className={`grid_child_${index+1}`}>
            <Card.Img 
              src={recipe.imageUrl || 'https://via.placeholder.com/150'} 
              className='home_component_img' 
              alt={recipe.name} 
            />
            <h3 className='home_component_head'>{recipe.name}</h3>
          </div>
        ))}
      </Container>
    </Container>
  );
}

export default Dishgrid;
