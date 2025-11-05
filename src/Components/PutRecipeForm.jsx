import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, ProgressBar, Spinner, Alert } from "react-bootstrap";
import { fetchDatasAuth, putDataAuth } from "../service/Api"; // adjust path
import { BASE_URL } from "../service/Api";

const PutRecipeForm = ({ recipeId }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingImg, setLoadingImg] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
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
    recipeIngredientsDto: [{ ingredient: "", measure: "" }],
    tags: [{ name: "" }]
  });

  // Fetch existing recipe
  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchDatasAuth(`/api/recipebook/Recipes/getRecipe/${recipeId}`);
        if (data) {
          setFormData({
            recipeId: data.recipeId,
            name: data.name || "",
            instructions: data.instructions || "",
            imageUrl: data.imageUrl || null,
            videUrl: data.videUrl || null,
            category: data.category || "",
            area: data.area || "",
            cookingTime: data.cookingTime || "",
            recipeType: data.recipeType || "",
            recipeIngredientsDto: data.recipeIngredientsDto?.length
              ? data.recipeIngredientsDto
              : [{ ingredient: "", measure: "" }],
            tags: data.tags?.length ? data.tags : [{ name: "" }]
          });
          setImagePreview(data.imageUrl);
        }
      } catch (err) {
        setAlert({ type: "danger", message: "Failed to load recipe." });
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...formData.recipeIngredientsDto];
    updated[index][name] = value;
    setFormData({ ...formData, recipeIngredientsDto: updated });
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

  const deleteOldImage = async (oldUrl) => {
    if (!oldUrl) return;
    const fileName = oldUrl.split("/").pop(); // extract file name from URL
    try {
      await fetch(`/api/recipebook/Upload/image/${fileName}`, {
        method: "DELETE"
      });
    } catch (err) {
      console.warn("Failed to delete old image:", err);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingImg(true);

    // Delete old image if exists
    if (formData.imageUrl) {
      await deleteOldImage(formData.imageUrl);
    }

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
    } catch {
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
      const confirmAction = window.confirm("Are you sure you want to update this recipe?");
      if (!confirmAction) return;
      setConfirmed(true);
    }

    const payload = {
      ...formData,
      videUrl: formData.videUrl || null,
    };

    try {
      await putDataAuth("/api/recipebook/Recipes", payload);
      setAlert({ type: "success", message: "Recipe updated successfully!" });
    } catch (err) {
      setAlert({ type: "danger", message: "Update failed." });
    }
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
        <p>Loading recipe...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3 className="mb-3">Edit Recipe</h3>
      <ProgressBar now={(step / 3) * 100} label={`Step ${step} of 3`} className="mb-3" />
      {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}

      {/* STEP 1 */}
      {step === 1 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Instructions</Form.Label>
            <Form.Control as="textarea" rows={3} name="instructions" value={formData.instructions} onChange={handleChange} />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" value={formData.category} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Area</Form.Label>
                <Form.Control name="area" value={formData.area} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Cooking Time (minutes)</Form.Label>
                <Form.Control type="number" name="cookingTime" value={formData.cookingTime} onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Recipe Type</Form.Label>
                <Form.Control name="recipeType" value={formData.recipeType} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Video URL (optional)</Form.Label>
            <Form.Control name="videUrl" value={formData.videUrl || ""} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" disabled={!validateStep()} onClick={() => setStep(2)}>Next</Button>
        </Form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <Form>
          {formData.recipeIngredientsDto.map((item, i) => (
            <Row key={i} className="mb-2">
              <Col>
                <Form.Control
                  placeholder="Ingredient"
                  name="ingredient"
                  value={item.ingredient}
                  onChange={(e) => handleIngredientChange(i, e)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Measure"
                  name="measure"
                  value={item.measure}
                  onChange={(e) => handleIngredientChange(i, e)}
                />
              </Col>
            </Row>
          ))}
          <Button variant="secondary" className="me-2" onClick={addIngredient}>Add Ingredient</Button>

          <Form.Group className="mt-3">
            <Form.Label>Tag</Form.Label>
            <Form.Control placeholder="Tag name" value={formData.tags[0].name} onChange={handleTagChange} />
          </Form.Group>

          <div className="mt-3">
            <Button variant="secondary" className="me-2" onClick={() => setStep(1)}>Back</Button>
            <Button variant="primary" disabled={!validateStep()} onClick={() => setStep(3)}>Next</Button>
          </div>
        </Form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload New Image (optional)</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
          </Form.Group>

          {loadingImg && <Spinner animation="border" />}
          {imagePreview && (
            <div className="mb-3">
              <p>Current Image:</p>
              <img src={imagePreview} alt="Recipe" className="img-fluid rounded" style={{ maxWidth: "300px" }} />
            </div>
          )}
          {uploadSuccess && <p className="text-success">Image uploaded successfully!</p>}

          <div className="mt-3">
            <Button variant="secondary" className="me-2" onClick={() => setStep(2)}>Back</Button>
            <Button variant="success" disabled={!validateStep()} onClick={handleSubmit}>Update</Button>
          </div>
        </Form>
      )}
    </Container>
  );
};

export default PutRecipeForm;
