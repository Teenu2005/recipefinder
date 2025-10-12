import { createContext, useState,useEffect } from "react";

const FavListContext = createContext();

const FavListProvider = ({ children }) => {
  const [likedDishList, setLikedDishList] = useState(['52940']);
useEffect(()=>{
    console.log(likedDishList)
},[likedDishList])
  const updateList = (value) => {
    setLikedDishList(prevItems => {
      const index = prevItems.indexOf(value);
      if (index !== -1) {
        prevItems.splice(index, 1);
      }
      return [...prevItems];
    });
  }

  const addFav = (value) => {
    setLikedDishList(prev => [...prev, value]);
  }

  return (
    <FavListContext.Provider value={{ likedDishList, updateList, addFav }}>
      {children}
    </FavListContext.Provider>
  );
}

export { FavListContext, FavListProvider };
