import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Pagination } from "react-bootstrap";
import { fetchDatasAuth, deleteDataAuth } from "../../service/Api";
import { useNavigate } from "react-router-dom";

function UserRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 4; // show 4 recipes per page
  const nav = useNavigate();

  useEffect(() => {
    loadUserRecipes(currentPage);
  }, [currentPage]);

  const loadUserRecipes = async (page) => {
    setLoading(true);
    try {
      const res = await fetchDatasAuth(`User/posted?pageNumber=${page}&pageSize=${pageSize}`);
      const data = res.data || res;
      setRecipes(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load user recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteDataAuth(`/api/recipebook/Recipes/del/${id}`);
      setRecipes((prev) => prev.filter((r) => r.recipeId !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="user-recipes-section">
      <h3 className="mb-3">Your Posted Recipes</h3>
      {recipes.length === 0 ? (
        <div className="empty-recipes text-center py-5">
          <p>You haven’t posted any recipes yet.</p>
        </div>
      ) : (
        <>
          <Row>
            {recipes.map((recipe) => (
              <Col key={recipe.recipeId} sm={12} md={6} lg={6} className="mb-4">
                <Card className="recipe-card shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipe-img"
                  />
                  <Card.Body>
                    <Card.Title>{recipe.name}</Card.Title>
                    <Card.Text className="recipe-text">
                      {recipe.instructions.slice(0, 120)}...
                    </Card.Text>
                    <div className="d-flex justify-content-between mt-auto">
                      <Button
                        onClick={() => nav(`/editprofile/${recipe.recipeId}`)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDelete(recipe.recipeId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.First
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              />
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              />
              <Pagination.Last
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              />
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}

export default UserRecipes;
