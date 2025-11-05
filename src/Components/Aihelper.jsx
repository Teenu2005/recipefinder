import React, { useState, useEffect } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {fetchDatas} from '../service/Api'

export default function Aihelper() {
  const { id } = useParams(); 
  const [language, setLanguage] = useState("English");

    const handleExplain = async () => {
    if (!language) {
      alert("Please enter a language!");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const endpoint = `/api/recipebook/Ai/ask?id=${id}&lang=${language}`;
      const data = await fetchDatas(endpoint);

      if (data && data.aiResponce) {
        setResponse(data.aiResponce);
      } else {
        setResponse("No AI response received.");
      }
    } catch (error) {
      console.error("Error fetching AI explanation:", error);
      setResponse("Error fetching AI explanation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contanier-fluid">
      <div className="ai_cont">
      <h5>AI Recipe Helper</h5>
      {/* <p><b>Meal :</b> {mealName}</p> */}
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

      {response && (
        <Card className="ai_responce">
          <h6>AI Explanation ({language}):</h6>
          <p>{response}</p>
        </Card>
      )}

      <Card className="ai_responce">
        <h6>Original Instructions:</h6>
        <p style={{ whiteSpace: "pre-line" }}>{mealInstructions}</p>
      </Card>
      </div>
      </div>
    </div>
  );
}
