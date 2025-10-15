import React, { useState, useEffect,useContext } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { TiHeartFullOutline } from "react-icons/ti";
import { FavListContext } from '../Context/FavouriteContect';
import {fetchData} from '../service/Api'

function FavouriteList() {
  const [meals, setMeals] = useState([]);
  const { likedDishList, updateList, addFav } = useContext(FavListContext);

  // using use context get favourite list from the local storage then display it
  useEffect(() => {
    if (likedDishList.length > 0) {
      const fetchMeals = async () => {
        // here use the map function to favourite list get the detail of each data from api
        const mealPromises = likedDishList.map(id => fetchData(`lookup.php?i=${id}`));
        // this is to hold the exection for all respons the promise all only return all api call return success
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
      <h3>Favourite Meals</h3>
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