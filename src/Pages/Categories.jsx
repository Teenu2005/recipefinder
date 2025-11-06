import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchDatas } from '../service/Api';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    async function get() {
      try {
        // Use your API endpoint
        const data = await fetchDatas(`recipe/Search/getCategories`);
        setCategories(data);
        
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }
    get();
  }, []);

  function getItems(e) {
    const categoryName = e.currentTarget.getAttribute('data-name');
    nav(`/items/${encodeURIComponent(categoryName)}`);
  }

  const placeholderImg = 'https://via.placeholder.com/300x200?text=No+Image';

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading categories...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="Card_Contanier">
      <h3>Top Categories</h3>
      <Row md={3} lg={5}>
        {categories.map((value, index) => (
          <Col sm md={3} key={index}>
            <Card
              data-name={value.name}
              onClick={getItems}
              className="category-card"
              style={{ cursor: 'pointer' }}
            >
              <Card.Img
                src={value.imgUrl || placeholderImg}
                alt={value.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Header>{value.name}</Card.Header>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;
