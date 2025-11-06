import React, { useEffect, useState } from "react";
import { Card, Spinner, Button, Alert, Row, Col } from "react-bootstrap";
import { fetchDatasAuth, deleteDataAuth,postDataAuth } from "../../service/Api";
import imgPlaceholder from "../../assets/profile.png";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const nav = useNavigate();

  // Fetch user info + recipes
  useEffect(() => {
    async function loadProfile() {
      try {
        const userData = await fetchDatasAuth("User");
        const userPosts = await fetchDatasAuth("User/posted");
        console.log(userData,"midle\n",userPosts)
        if (userData) setUser(userData);
        if (userPosts) setRecipes(userPosts);
      } catch (err) {
        console.error(err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
    window.location.reload();
  };

  // Delete recipe function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      await deleteDataAuth(`/api/recipebook/Recipes/del/${id}`);
      setRecipes((prev) => prev.filter((r) => r.recipeId !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );

  if (!user)
    return (
      <Alert variant="danger" className="text-center">
        Failed to load user profile. Please login again.
      </Alert>
    );

  return (
    <div className="container-fluid profile-page">
      <Row>
        {/* Profile Section*/}
        <Col md={4} className="profile-left mb-4">
          <Card className="profile-card shadow-sm">
            <Card.Body className="text-center">
              <img
                src={user.imgUrl && user.imgUrl !== "null" ? user.imgUrl : imgPlaceholder}
                alt="Profile"
                className="profile-img"
              />
              <h4 className="mt-3">{user.username}</h4>
              <p>{user.email}</p>
              <Button variant="primary" onClick={() => nav("/editprofile")} className="me-2">
                Edit Profile
              </Button>
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Recipes Section */}
        <Col md={8} className="recipes-right">
          <h3 className="mb-3">Your Posted Recipes</h3>
          {recipes.length === 0 ? (
            <p>You haven’t posted any recipes yet.</p>
          ) : (
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
                          variant="outline-primary"
                          onClick={() => nav(`/edit-recipe/${recipe.recipeId}`)}
                        >
                          Edit
                        </Button>
                        <Button variant="outline-danger" onClick={() => handleDelete(recipe.recipeId)}>
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
