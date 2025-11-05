import React, { useState } from "react";
import { Form, Button, Container, Row, Col, ProgressBar, Spinner, Alert } from "react-bootstrap";
import { postDataAuth } from "../service/Api"; // adjust path if needed

const PoatRecipeForm = () => {
  const [step, setStep] = useState(1);
  const [loadingImg, setLoadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [confirmed, setConfirmed] = useState(false);

  const [formData, setFormData] = useState({
    recipeId: 0,
    name: "",
    instructions: "",
    imageUrl: null,
    videUrl: null,
    category: "",
    area: "",
    cookingTime: "",
    recipeType: "",
    recipeIngredientsDto: [
      { ingredient: "", measure: "" }
    ],
    tags: [
      { name: "" }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...formData.recipeIngredientsDto];
    newIngredients[index][name] = value;
    setFormData({ ...formData, recipeIngredientsDto: newIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      recipeIngredientsDto: [...formData.recipeIngredientsDto, { ingredient: "", measure: "" }]
    });
  };

  const handleTagChange = (e) => {
    setFormData({ ...formData, tags: [{ name: e.target.value }] });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);
    const formDataImg = new FormData();
    formDataImg.append("fileimg", file);

    try {
      const res = await fetch("/api/recipebook/Upload/image", {
        method: "POST",
        body: formDataImg,
      });

      const data = await res.json();

      if (data.success) {
        setFormData({ ...formData, imageUrl: data.imageUrl });
        setImagePreview(data.imageUrl);
        setUploadSuccess(true);
      } else {
        setAlert({ type: "danger", message: "Image upload failed." });
      }
    } catch (err) {
      setAlert({ type: "danger", message: "Error uploading image." });
    } finally {
      setLoadingImg(false);
    }
  };

  const validateStep = () => {
    if (step === 1) {
      const { name, instructions, category, area, cookingTime, recipeType } = formData;
      return name && instructions && category && area && cookingTime && recipeType;
    }
    if (step === 2) {
      return formData.recipeIngredientsDto.every(i => i.ingredient && i.measure);
    }
    if (step === 3) {
      return formData.imageUrl !== null;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!confirmed) {
      const userConfirmed = window.confirm("Are you sure you want to submit this recipe?");
      if (!userConfirmed) return;
      setConfirmed(true);
    }

    const payload = {
      ...formData,
      videUrl: formData.videUrl || null,
    };

    const res = await postDataAuth("/recipebook/Recipes", payload);

    if (res && !res.error) {
      setAlert({ type: "success", message: "Recipe uploaded successfully!" });
    } else {
      setAlert({ type: "danger", message: res.error || "Upload failed." });
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Add New Recipe</h3>
      <ProgressBar now={(step / 3) * 100} label={`Step ${step} of 3`} className="mb-3" />
      {alert.message && (
        <Alert variant={alert.type}>{alert.message}</Alert>
      )}

      {step === 1 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control as="textarea" rows={3} name="instructions" value={formData.instructions} onChange={handleChange} required />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" value={formData.category} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Area</Form.Label>
                <Form.Control name="area" value={formData.area} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cooking Time (minutes)</Form.Label>
                <Form.Control type="number" name="cookingTime" value={formData.cookingTime} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Recipe Type</Form.Label>
                <Form.Control name="recipeType" value={formData.recipeType} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Video URL (optional)</Form.Label>
            <Form.Control name="videUrl" value={formData.videUrl || ""} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" disabled={!validateStep()} onClick={() => setStep(2)}>
            Next
          </Button>
        </Form>
      )}

      {step === 2 && (
        <Form>
          {formData.recipeIngredientsDto.map((item, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  placeholder="Ingredient"
                  name="ingredient"
                  value={item.ingredient}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Measure"
                  name="measure"
                  value={item.measure}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </Col>
            </Row>
          ))}
          <Button variant="secondary" className="me-2" onClick={addIngredient}>Add Ingredient</Button>

          <Form.Group className="mt-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control placeholder="Tag name" value={formData.tags[0].name} onChange={handleTagChange} required />
          </Form.Group>

          <div className="mt-3">
            <Button variant="secondary" className="me-2" onClick={() => setStep(1)}>Back</Button>
            <Button variant="primary" disabled={!validateStep()} onClick={() => setStep(3)}>Next</Button>
          </div>
        </Form>
      )}

      {step === 3 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
          </Form.Group>

          {loadingImg && <Spinner animation="border" />}
          {uploadSuccess && imagePreview && (
            <div className="mb-3">
              <p>Uploaded Image:</p>
              <img src={imagePreview} alt="Uploaded" className="img-fluid rounded" style={{ maxWidth: "300px" }} />
            </div>
          )}

          <div className="mt-3">
            <Button variant="secondary" className="me-2" onClick={() => setStep(2)}>Back</Button>
            <Button variant="success" disabled={!validateStep()} onClick={handleSubmit}>Submit</Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default PoatRecipeForm;
