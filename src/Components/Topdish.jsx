import React, { useState, useEffect } from 'react';
import { Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from "react-icons/fa";
import { fetchDatas } from '../service/Api';

function Topdish({ Place }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function getApiResult() {
      setLoading(true);
      try {
        // Fetch top 5 recipes from paginated API
        const data = await fetchDatas(`/recipeBook/recipe/Search/area?area=${Place}&pageNumber=1&pageSize=5`);
        setCategories(data.items || []);
      } catch (error) {
        console.error("Error fetching top dishes:", error);
      } finally {
        setLoading(false);
      }
    }

    getApiResult();
  }, [Place]);

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (!categories.length) return <p>No recipes found for {Place}.</p>;

  function goToRecipe(id) {
    nav(`/item/${id}`);
  }

  return (
    <Container fluid className='home_component_top'>
      <div className="nav_cat">
        <h3>{Place}</h3>
        <a href={`/native/${Place}`}><FaChevronRight /></a>
      </div>
      <Container fluid className='home_component'>
        {categories.map((recipe) => (
          <div 
            key={recipe.recipeId} 
            className='home_component_div' 
            onClick={() => goToRecipe(recipe.recipeId)}
          >
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

export default Topdish;
