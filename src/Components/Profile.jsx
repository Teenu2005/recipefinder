import React, { useEffect, useState } from 'react';
import { Card, Spinner, Button, Form, Alert } from 'react-bootstrap';
import { fetchDatasAuth, putDataAuth, uploadImage } from '../service/Api';
import imgPlaceholder from '../assets/profile.png';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    imgUrl: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imgUploading, setImgUploading] = useState(false);

  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  // Fetch user profile
  useEffect(() => {
    async function getUser() {
      try {
        const data = await fetchDatasAuth('/recipebook/User');
        if (data) {
          setUser(data);
          setForm({
            username: data.username,
            email: data.email,
            password: '',
            confirmPassword: '',
            imgUrl: data.imgUrl !== "null" ? data.imgUrl : null
          });
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return <p>Failed to load user profile. Please login again.</p>;
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB");
      return;
    }

    setError('');
    setSuccess('');
    setImgUploading(true);

    try {
      const uploadRes = await uploadImage(file);
      if (uploadRes?.success) {
        setForm(prev => ({ ...prev, imgUrl: uploadRes.imageUrl }));
        setSuccess('Image uploaded successfully!');
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Image upload failed');
    } finally {
      setImgUploading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate username and email
    if (!form.username.trim() || !form.email.trim()) {
      setError("Username and Email are required!");
      return;
    }

    // Password validation only if user tries to change password
    if (form.password) {
      if (!passwordRegex.test(form.password)) {
        setError(
          "Password must be at least 6 characters long and include uppercase, lowercase, number, and special character."
        );
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match!");
        return;
      }
    }

    try {
      const body = {
        username: form.username,
        email: form.email,
        imgUrl: form.imgUrl,
        password: form.password || user.password
      };

      await putDataAuth('/recipebook/User', body);
      setSuccess("Profile updated successfully!");
      setEditMode(false);
      setUser(prev => ({ ...prev, ...body }));
      setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <>
    <div className="profile-container" style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <Card>
        <Card.Body>
          <div style={{ textAlign: 'center' }}>
            <img
              src={form.imgUrl || imgPlaceholder}
              alt="Profile"
              style={{
                borderRadius: '50%',
                width: '120px',
                height: '120px',
                objectFit: 'cover'
              }}
            />

            {editMode && (
              <Form.Group className="mt-3">
                <Form.Label>Change Profile Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={imgUploading}
                />
                {imgUploading && (
                  <div className="mt-2">
                    <Spinner animation="border" size="sm" /> Uploading image...
                  </div>
                )}
              </Form.Group>
            )}

            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
            {success && <Alert variant="success" className="mt-2">{success}</Alert>}

            {editMode ? (
              <Form onSubmit={handleSubmit} className="mt-3 text-start">
                <Form.Group className="mb-2">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                  {form.password && !passwordRegex.test(form.password) && (
                    <small className="text-danger">
                      Must include uppercase, lowercase, number & special char.
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="mt-2"
                  variant="primary"
                  disabled={imgUploading}
                >
                  {imgUploading ? (
                    <>
                      <Spinner animation="border" size="sm" /> Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>{' '}
                <Button
                  variant="secondary"
                  className="mt-2"
                  onClick={() => {
                    setEditMode(false);
                    setError('');
                    setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
                  }}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <h4 style={{ marginTop: '1rem' }}>{user.username}</h4>
                <p>{user.email}</p>
                <Button className="mt-2" onClick={() => setEditMode(true)}>Edit Profile</Button>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
    </>
  );
}

export default Profile;
