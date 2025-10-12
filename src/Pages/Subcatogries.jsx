// import React, { useState, useEffect, useContext } from 'react';
// import { Col, Row, Card, Container, Button } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import { TiHeartFullOutline } from "react-icons/ti";
// import { FavListContext } from '../Context/FavouriteContect';


// function Subcatogries() {
//   // const [likedDish, setLikedDish] = useState([]);
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const {likedDishList,updateList,addFav} = useContext(FavListContext);
//   const nav = useNavigate();
//   const totalCard = 10;
//   const cat = useParams() || "";
//   useEffect(() => {
//     getapi();
//   }, []);
//   // calling likeddish function after api call so that we can display the like resule
//   useEffect(() => {
//     likeMarkerFun(likedDishList);
//   }, [items]);

//   async function getapi() {
//     try {
//       await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.id}`)
//         .then(res => res.json())
//         .then(data => setItems(data.meals));
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // Pagination calculations
//   let startIndex = (page - 1) * totalCard;
//   let endIndex = startIndex + totalCard;
//   let current = items.slice(startIndex, endIndex);

//   // Total pages array
//   const arr = Array.from({ length: Math.ceil(items.length / totalCard) }, (_, i) => i + 1);

//  function getitems(e){
//     nav(`/item/${items[e.target.id].idMeal}`)
//  }
//  const likeMarkerFun = (likedDishList)=>{
//   likedDishList.forEach(element => {
//     document.getElementById(element).classList.add('liked')
//   });
//  }
// function markLike(e){
//   if(e.target.classList[0]=='liked'){
//     e.target.classList.remove('liked')
//     // setLikedDish(prevItems =>{
//     //   prevItems.splice(1,[prevItems.indexOf(e.target.farthestViewportElement.id)]); 
//     //   return prevItems;
//     // } );
//     updateList(e.target.farthestViewportElement.id);
//   }
//   else{
//   e.target.classList.add('liked');
//   // setLikedDish(prevItems => [...prevItems, e.target.farthestViewportElement.id]);
//   // console.log(likedDish);
//   addFav(e.target.farthestViewportElement.id);
// }
// }
//   return (
//     <Container fluid className="Card_Contanier">
//       <h3>{cat.id}</h3>
//       <Row md={3} lg={4}>
//         {current.map((value, index) => (
//           <Col sm={2} key={index}>
//             <Card className="itemcard" id={index} onClick={getitems}>
//               <TiHeartFullOutline onClick={markLike} id={value.idMeal} className='heart_icon'/>
//               <Card.Img id={index} src={value.strMealThumb} />
//               <Card.Text id={index}>{value.strMeal}</Card.Text>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {/* Pagination Buttons */}
//       <div className="pageno ">
//         <button 
//           onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
//           style={page==1?{ display: 'none'}:null}
//         >
//           &larr; Prev
//         </button>

//         {arr.map((num) => (
//           <button 
//             key={num} 
//             className={num === page ? "selected" : "notselected"}
//             onClick={() => setPage(num)}
//           >
//             {num}
//           </button>
//         ))}

//         <button 
//           onClick={() => setPage(prev => (prev < arr.length ? prev + 1 : prev))}
//           style={page==arr.length?{ display: 'none'}:null}
//         >
//           &rarr; Next
//         </button>
//       </div>
//     </Container>
//   );
// }

// export default Subcatogries;
import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Card, Container, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TiHeartFullOutline } from "react-icons/ti";
import { FavListContext } from '../Context/FavouriteContect';

function Subcatogries() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const { likedDishList, updateList, addFav } = useContext(FavListContext);
  const nav = useNavigate();
  const totalCard = 10;
  const cat = useParams() || "";
  useEffect(() => {
    getapi();
  }, []);

  useEffect(() => {
    likeMarkerFun(likedDishList);
  }, [items, likedDishList]);

  async function getapi() {
    try {
      await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat.id}`)
        .then(res => res.json())
        .then(data => setItems(data.meals));
    } catch (err) {
      console.log(err);
    }
  }

  let startIndex = (page - 1) * totalCard;
  let endIndex = startIndex + totalCard;
  let current = items.slice(startIndex, endIndex);

  const arr = Array.from({ length: Math.ceil(items.length / totalCard) }, (_, i) => i + 1);

  function getitems(e) {
    nav(`/item/${items[e.target.id].idMeal}`)
  }

  const likeMarkerFun = (likedDishList) => {
    likedDishList.forEach(element => {
      const heartIcon = document.getElementById(element);
      if (heartIcon) {
        heartIcon.classList.add('liked')
      }
    });
  }

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
    <Container fluid className="Card_Contanier">
      <h3>{cat.id}</h3>
      <Row md={3} lg={4}>
        {current.map((value, index) => (
          <Col sm={2} key={index}>
            <Card className="itemcard">
              <TiHeartFullOutline onClick={markLike} id={value.idMeal} className={`heart_icon ${likedDishList.includes(value.idMeal) ? 'liked' : ''}`} />
              <Card.Img src={value.strMealThumb} onClick={() => getitems({ target: { id: index } })} />
              <Card.Text>{value.strMeal}</Card.Text>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="pageno ">
        <button onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))} style={page == 1 ? { display: 'none' } : null} >
          &larr; Prev
        </button>
        {arr.map((num) => (
          <button key={num} className={num === page ? "selected" : "notselected"} onClick={() => setPage(num)} >
            {num}
          </button>
        ))}
        <button onClick={() => setPage(prev => (prev < arr.length ? prev + 1 : prev))} style={page == arr.length ? { display: 'none' } : null} >
          &rarr; Next
        </button>
      </div>
    </Container>
  );
}

export default Subcatogries;