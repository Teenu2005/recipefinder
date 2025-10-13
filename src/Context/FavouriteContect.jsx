import { createContext, useState, useEffect } from "react";

const FavListContext = createContext();
// for storing  favourit dish list in local storage and retive it when needed
const FavListProvider = ({ children }) => {
  const [likedDishList, setLikedDishList] = useState([]);

  // get the list in local stograge when the page loaded
  useEffect(() => {
    const temp = localStorage.getItem("favList");
    if (temp && likedDishList.length === 0) {
      setLikedDishList(JSON.parse(temp));
    }
  }, []);

  // every change in list updated using this use effect
  useEffect(() => {
    if (likedDishList.length > 0) {
      const arrStringify = JSON.stringify(likedDishList);
      localStorage.setItem("favList", arrStringify);
    }
  }, [likedDishList]);

  // this for update the list provide to the child
  const updateList = (value) => {
    setLikedDishList(prevItems => prevItems.filter(item => item !== value));
  };

  // this fo the addition of new item to fav list
  const addFav = (value) => {
    if (!likedDishList.includes(value)) {
      setLikedDishList(prev => [...prev, value]);
    }
  };

  return (
    <FavListContext.Provider value={{ likedDishList, updateList, addFav }}>
      {children}
    </FavListContext.Provider>
  );
};

export { FavListContext, FavListProvider };