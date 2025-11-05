import React, { useState, useEffect } from 'react';
import { TiHeartFullOutline } from "react-icons/ti";
import { fetchDatasAuth, postDataAuth, deleteDataAuth } from '../service/Api';

function FavouriteList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchFavMeals();
  }, []);

  const fetchFavMeals = async () => {
    try {
      const favResponse = await fetchDatasAuth('/recipebook/User/fav');
      
      if (favResponse.Message === "No favourites found.") {
        setMessage("You have not liked any meal.");
        setMeals([]);
        setLoading(false);
        return;
      }

      const favList = favResponse.responce.favList;
      if (!favList || favList.length === 0) {
        setMessage("You have not liked any meal.");
        setMeals([]);
        setLoading(false);
        return;
      }

      const mealDetailsResponse = await postDataAuth('/recipebook/recipe/Search/list', favList);
      setMeals(mealDetailsResponse.items || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite meals:", error);
      setMessage("Failed to load favourite meals.");
      setLoading(false);
    }
  };

  //  Remove favourite 
  const handleRemoveFavourite = async (recipeId) => {
    const response = await deleteDataAuth(`/recipebook/User/fav/${recipeId}`);
    if (response.success) {
     
      setMeals(prev => prev.filter(meal => meal.recipeId !== recipeId));
    } else {
      console.error("Failed to remove favourite:", response.error);
    }
  };

  if (loading) return <div class="loading d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>;
  if (message) return <p>{message}</p>;

  return (
    <div className='favourite_list_cont'>
      <h3>Favourite Meals</h3>
      <div className="fav_holder">
      {meals.map(meal => (
        <div className='favourite_list_item' key={meal.recipeId}>
          <TiHeartFullOutline 
            className='heart_icon liked'
            onClick={() => handleRemoveFavourite(meal.recipeId)} 
            title="Remove from favourites"
          />
          <img className="img-thumbnail" src={meal.imageUrl} alt={meal.name} />
          <div className="favourite_dish_detail">
            <h3>{meal.name}</h3>
            <a href={`/item/${meal.recipeId}`}>
              <p>{meal.instructions.slice(0, 100)}...</p>
            </a>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default FavouriteList;
