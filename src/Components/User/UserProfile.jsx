import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../../assets/profile.png";

function UserProfile({ user }) {
  const nav = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    nav("/");
    window.location.reload();
  };

  return (
    <Card className="profile_detail_contanier">
      <img
        src={user.imgUrl && user.imgUrl !== "null" ? user.imgUrl : imgPlaceholder}
        alt="Profile"
        className="profile_img"
      />
      <h4>{user.username}</h4>
      <p>{user.email}</p>
      <div className="d-flex justify-content-center">
        <Button
          className="me-2"
          onClick={() => nav("/editprofile")}
        >
          Edit Profile
        </Button>
        <Button variant="danger" onClick={logout}>
          Logout
        </Button>
      </div>
    </Card>
  );
}

export default UserProfile;
