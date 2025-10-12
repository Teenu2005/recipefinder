import { createContext, useState, useEffect } from "react";

const FavListContext = createContext();

const FavListProvider = ({ children }) => {
  const [likedDishList, setLikedDishList] = useState([]);

  useEffect(() => {
    const temp = localStorage.getItem("favList");
    if (temp && likedDishList.length === 0) {
      setLikedDishList(JSON.parse(temp));
    }
  }, []);

  useEffect(() => {
    if (likedDishList.length > 0) {
      const arrStringify = JSON.stringify(likedDishList);
      localStorage.setItem("favList", arrStringify);
    }
  }, [likedDishList]);

  const updateList = (value) => {
    setLikedDishList(prevItems => prevItems.filter(item => item !== value));
  };

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