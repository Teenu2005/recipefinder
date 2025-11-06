import React, { useEffect, useState } from "react";
import { Row, Col, Spinner, Alert } from "react-bootstrap";
import { fetchDatasAuth } from "../service/Api";
import UserProfile from "../components/user/UserProfile";
import UserRecipes from "../components/user/UserRecipes";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUserData() {
      try {
        const res = await fetchDatasAuth("User");
        const userData = res.data || res;
        setUser(userData);
      } catch (err) {
        console.error(err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    }
    loadUserData();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );

  if (error || !user)
    return (
      <Alert variant="danger" className="text-center">
        {error || "Failed to load user profile. Please log in again."}
      </Alert>
    );

  return (
    <div className="container-fluid profile-page">
      <Row>
        <Col md={4} className="mb-4">
          <UserProfile user={user} />
        </Col>
        <Col md={8}>
          <UserRecipes />
        </Col>
      </Row>
    </div>
  );
}

export default Profile;
