import React, { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import { fetchDatasAuth, putDataAuth, uploadImage } from "../service/Api";

function EditProfile() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    imgUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [imgUploading, setImgUploading] = useState(false);
  const [forgetMode, setForgetMode] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchDatasAuth("/recipebook/User");
        setForm((prev) => ({
          ...prev,
          username: data.username,
          email: data.email,
          imgUrl: data.imgUrl !== "null" ? data.imgUrl : "",
        }));
      } catch (err) {
        setMsg({ type: "danger", text: "Failed to load profile" });
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgUploading(true);
    try {
      const res = await uploadImage(file);
      if (res.success) setForm((prev) => ({ ...prev, imgUrl: res.imageUrl }));
    } catch {
      setMsg({ type: "danger", text: "Failed to upload image" });
    } finally {
      setImgUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.username.trim() || !form.email.trim()) {
      return setMsg({ type: "danger", text: "Username and Email are required." });
    }

    if (form.newPassword) {
      if (!passwordRegex.test(form.newPassword)) {
        return setMsg({
          type: "danger",
          text: "Password must include uppercase, lowercase, number & special character.",
        });
      }
      if (form.newPassword !== form.confirmPassword) {
        return setMsg({ type: "danger", text: "Passwords do not match!" });
      }
    }

    try {
      await putDataAuth("/recipebook/User", form);
      setMsg({ type: "success", text: "Profile updated successfully!" });
    } catch {
      setMsg({ type: "danger", text: "Failed to update profile" });
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="edit-profile-container">
      <Card className="shadow-sm">
        <Card.Body>
          <h3>Edit Profile</h3>
          {msg.text && <Alert variant={msg.type}>{msg.text}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" value={form.username} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              {imgUploading && <Spinner animation="border" size="sm" />}
            </Form.Group>

            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <h5>{forgetMode ? "Forget Password" : "Change Password"}</h5>
              <Button variant="link" onClick={() => setForgetMode((p) => !p)}>
                {forgetMode ? "Back to Change" : "Forgot Password?"}
              </Button>
            </div>

            {!forgetMode && (
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProfile;
