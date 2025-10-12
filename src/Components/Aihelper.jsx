import React, { useState, useEffect } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Aihelper() {
  const { id } = useParams(); 
  const [language, setLanguage] = useState("English");
  const [mealName, setMealName] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    async function getMealDetails() {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        if (data.meals && data.meals.length > 0) {
          setMealInstructions(data.meals[0].strInstructions);
          setMealName(data.meals[0].strMeal);
        } else {
          setMealInstructions("No instructions found for this meal.");
        }
      } catch (err) {
        console.error("Error fetching meal:", err);
        setMealInstructions("Error fetching meal details.");
      }
    }
    getMealDetails();
  }, [id]);

 const handleExplain = async () => {
  if (!mealInstructions) {
    setResponse("No meal instructions available.");
    return;
  }

  setLoading(true);
  setResponse("");

  const prompt = `Explain the following recipe instructions in ${language} in a friendly and simple way:\n\n${mealInstructions}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("Gemini Response:", data);

    const textOutput =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";
    setResponse(textOutput);
  } catch (error) {
    console.error(error);
    setResponse("Error connecting to AI API. Please try again later.");
  }

  setLoading(false);
};


  return (
    <div className="contanier-fluid">
      <div className="ai_cont">
      <h5>AI Recipe Helper</h5>
      <p><b>Meal :</b> {mealName}</p>
      <div className="ai_form">
      <Form.Select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-3"
      >
        <option>English</option>
        <option>Tamil</option>
        <option>Hindi</option>
        <option>Malayalam</option>
        <option>Telugu</option>
      </Form.Select>

      <Button variant="info" onClick={handleExplain} disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : "Explain in My Language"}
      </Button>
      </div>
      <div className="ai_responce_cont">
      <Card className="ai_responce">
        <h6>Original Instructions:</h6>
        <p style={{ whiteSpace: "pre-line" }}>{mealInstructions}</p>
      </Card>

      {response && (
        <Card className="ai_responce">
          <h6>AI Explanation ({language}):</h6>
          <p>{response}</p>
        </Card>
      )}
      </div>
      </div>
    </div>
  );
}
