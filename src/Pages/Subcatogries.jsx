import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { TiHeartFullOutline } from "react-icons/ti";
import { fetchDatas, postDataAuth, deleteDataAuth, fetchDatasAuth } from '../service/Api';

function Subcatogries() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [likedList, setLikedList] = useState([]); // store list of favourite IDs
  const nav = useNavigate();
  const categorie = useParams();
  const pageSize = 12;

  // Fetch category items
  useEffect(() => {
    async function getApiResult() {
      setLoading(true);
      try {
        const url = `/recipeBook/recipe/Search/category?category=${categorie.id}&pageNumber=${page}&pageSize=${pageSize}`;
        const data = await fetchDatas(url);

        if (data && data.items) {
          setItems(data.items);
          setTotalPages(data.totalPages || 1);
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    }

    getApiResult();
  }, [categorie.id, page]);

  //  Fetch user's favourite list once
  useEffect(() => {
    async function getFavourites() {
      try {
        const favResponse = await fetchDatasAuth('/recipebookUser/fav');
        if (favResponse?.responce?.favList) {
          setLikedList(favResponse.responce.favList.map(id => parseInt(id)));
        }
      } catch (err) {
        console.error("Failed to fetch favourites:", err);
      }
    }
    getFavourites();
  }, []);

  //  Handle Like/Unlike click
  const markLike = async (e) => {
    const dishId = parseInt(e.currentTarget.id);
    const isLiked = likedList.includes(dishId);

    // Optimistically update UI first
    setLikedList(prev => 
      isLiked ? prev.filter(id => id !== dishId) : [...prev, dishId]
    );

    try {
      if (isLiked) {
        //  Remove favourite
        await deleteDataAuth(`/recipebook/User/fav/${dishId}`);
      } else {
        //  Add favourite
        await postDataAuth(`/recipebook/User/fav/${dishId}`, {});
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
      // Revert UI if error
      setLikedList(prev =>
        isLiked ? [...prev, dishId] : prev.filter(id => id !== dishId)
      );
    }
  };

  const getitems = (id) => {
    nav(`/item/${id}`);
  };

  return (
    <Container fluid className="Card_Contanier">
      <h3>{categorie.id}</h3>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row md={3} lg={4}>
            {items.map((value, index) => (
              <Col sm={2} key={index}>
                <Card className="itemcard">
                  <TiHeartFullOutline
                    onClick={markLike}
                    id={value.recipeId}
                    className={`heart_icon ${likedList.includes(value.recipeId) ? 'liked' : ''}`}
                  />
                  <Card.Img
                    src={value.imageUrl || "https://via.placeholder.com/150"}
                    onClick={() => getitems(value.recipeId)}
                  />
                  <Card.Text>{value.name}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="pageno">
            <button
              onClick={() => setPage(prev => (prev > 1 ? prev - 1 : prev))}
              style={page === 1 ? { display: 'none' } : null}
            >
              &larr; Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={num === page ? "selected" : "notselected"}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage(prev => (prev < totalPages ? prev + 1 : prev))}
              style={page === totalPages ? { display: 'none' } : null}
            >
              &rarr; Next
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Subcatogries;
