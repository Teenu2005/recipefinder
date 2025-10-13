import React, { useState, useEffect,useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { TiHeartFullOutline } from "react-icons/ti";
import { FavListContext } from '../Context/FavouriteContect';


function FavouriteList() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const [meals, setMeals] = useState([]);
  const { likedDishList, updateList, addFav } = useContext(FavListContext);

  // using use context get favourite list from the local storage then display it
  useEffect(() => {
    if (likedDishList.length > 0) {
      const fetchMeals = async () => {
        const mealPromises = likedDishList.map(id => fetch(`${API_URL}lookup.php?i=${id}`).then(res => res.json()));
        const mealResponses = await Promise.all(mealPromises);
        const mealsData = mealResponses.map(response => response.meals[0]);
        setMeals(mealsData);
        console.log(mealsData[0])
      };
      fetchMeals();
    }
  }, [likedDishList]);

  // this is used to add or remove liked and unliked meal from the list using function provided by usecontext
function markLike(e) {
  const dishId = e.currentTarget.id;
  if (e.currentTarget.classList.contains('liked')) {
    e.currentTarget.classList.remove('liked')
    updateList(dishId);
  } else {
    e.currentTarget.classList.add('liked');
    addFav(dishId);
  }
}

  return (
      <div className='favourite_list_cont'>
      <h2>Favourite Meals</h2>
        {meals.map(meal => (
          <div className='favourite_list_item' key={meal.idMeal} sm={12} md={6} lg={4}>
              <TiHeartFullOutline onClick={markLike} id={meal.idMeal} className={`heart_icon ${likedDishList.includes(meal.idMeal) ? 'liked' : ''}`} />
            <img class="img-thumbnail"  src={meal.strMealThumb} alt="Dish_item" />
            <div className="favourite_dish_detail">
            <h3>{meal.strMeal}</h3>
            <a  href={`/item/${meal.idMeal}`}>
            <p>{meal.strInstructions.slice(0,100)}... 
            </p>
            </a>
            </div>
            <div className="fav_like_button">
               
            </div>
          </div>
        ))}
      </div>
  );
}

export default FavouriteList;