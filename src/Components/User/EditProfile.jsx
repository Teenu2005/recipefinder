import React, { useEffect, useState } from "react";
import { Form, Button, Spinner, Alert, Card } from "react-bootstrap";
import {
  fetchDatasAuth,
  putDataAuth,
  uploadImage,
  postDataAuth,
} from "../../service/Api";

function EditProfile() {
  const [mode, setMode] = useState(""); // '', 'details', 'password', or 'forgot'
  const [form, setForm] = useState({
    username: "",
    email: "",
    imgUrl: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [imgUploading, setImgUploading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  // Load user details initially
  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await fetchDatasAuth("User");
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

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image handler
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

  // Save Details (name, email, image)
  const handleSaveDetails = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.username.trim() || !form.email.trim()) {
      return setMsg({ type: "danger", text: "Username and Email are required." });
    }

    try {
      await putDataAuth("/recipebook/User", form);
      setMsg({ type: "success", text: "Profile details updated successfully!" });
    } catch {
      setMsg({ type: "danger", text: "Failed to update profile details." });
    }
  };

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.currentPassword.trim()) {
      return setMsg({ type: "danger", text: "Enter current password." });
    }
    if (!form.newPassword || !passwordRegex.test(form.newPassword)) {
      return setMsg({
        type: "danger",
        text: "New password must contain uppercase, lowercase, number & special character.",
      });
    }
    if (form.newPassword !== form.confirmPassword) {
      return setMsg({ type: "danger", text: "Passwords do not match!" });
    }

    try {
      await putDataAuth("/recipebook/User", form);
      setMsg({ type: "success", text: "Password changed successfully!" });
    } catch {
      setMsg({ type: "danger", text: "Failed to change password." });
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setMsg({ type: "", text: "" });
    if (!form.email.trim()) return setMsg({ type: "danger", text: "Email is required." });

    try {
      const res = await postDataAuth("User/sendOtp", { email: form.email });
      setOtpSent(true);
      setMsg({ type: "success", text: "OTP sent successfully!" });
    } catch {
      setMsg({ type: "danger", text: "Failed to send OTP." });
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setMsg({ type: "", text: "" });
    if (!form.otp.trim()) return setMsg({ type: "danger", text: "Enter your OTP." });

    try {
      await postDataAuth("User/verifyOtp", {
        email: form.email,
        token: form.otp,
      });
      setOtpVerified(true);
      setMsg({ type: "success", text: "OTP verified successfully!" });
    } catch {
      setMsg({ type: "danger", text: "Invalid or expired OTP." });
    }
  };

  // Reset Password (after OTP)
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!form.newPassword || form.newPassword !== form.confirmPassword) {
      return setMsg({ type: "danger", text: "Passwords do not match!" });
    }

    try {
      await postDataAuth("/api/User/resetPassword", {
        email: form.email,
        password: form.newPassword,
      });
      setMsg({ type: "success", text: "Password reset successfully!" });
      setOtpVerified(false);
      setOtpSent(false);
      setForm((prev) => ({ ...prev, otp: "", newPassword: "", confirmPassword: "" }));
    } catch {
      setMsg({ type: "danger", text: "Failed to reset password." });
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

          {/* Step 1: Choose Mode */}
          {!mode && (
            <div className="text-center py-4">
              <p>What would you like to edit?</p>
              <Button variant="primary" className="me-3" onClick={() => setMode("details")}>
                Edit Details
              </Button>
              <Button variant="warning" onClick={() => setMode("password")}>
                Change Password
              </Button>
              <Button variant="link" onClick={() => setMode("forgot")}>
                Forgot Password?
              </Button>
            </div>
          )}

          {/* Step 2: Edit Details */}
          {mode === "details" && (
            <Form onSubmit={handleSaveDetails}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                {imgUploading && <Spinner animation="border" size="sm" />}
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setMode("")}>
                  Back
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </Form>
          )}

          {/* Step 3: Change Password */}
          {mode === "password" && (
            <Form onSubmit={handleChangePassword}>
              <Form.Group className="mb-3">
                <Form.Label>Current Password</Form.Label>
                <Form.Control
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={() => setMode("")}>
                  Back
                </Button>
                <Button type="submit" variant="primary">
                  Change Password
                </Button>
              </div>
            </Form>
          )}

          {/* Step 4: Forgot Password Flow */}
          {mode === "forgot" && (
            <div>
              {!otpSent && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleSendOtp}>
                    Send OTP
                  </Button>
                </>
              )}

              {otpSent && !otpVerified && (
                <>
                  <Form.Group className="mt-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control
                      name="otp"
                      maxLength="6"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter 6-digit OTP"
                    />
                  </Form.Group>
                  <Button variant="success" className="mt-2" onClick={handleVerifyOtp}>
                    Verify OTP
                  </Button>
                </>
              )}

              {otpVerified && (
                <Form onSubmit={handleResetPassword} className="mt-3">
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={form.newPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Reset Password
                  </Button>
                </Form>
              )}

              <Button
                variant="secondary"
                className="mt-3"
                onClick={() => {
                  setMode("");
                  setOtpSent(false);
                  setOtpVerified(false);
                }}
              >
                Back
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default EditProfile;
