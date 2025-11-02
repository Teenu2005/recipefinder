import { useState, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import img from '../assets/Ai_png.png';
import { fetchDatas } from '../service/Api';

export default function Detail() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApiResult() {
      try {
        const data = await fetchDatas(`/recipeBook/recipe/Search/${id}`);
        setItem(data); // directly set the response
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    }
    getApiResult();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="primary" />;

  if (!item) return <p>Recipe not found.</p>;

  // Convert YouTube URL to embed URL
  let embedUrl = item.videUrl ? item.videUrl.replace("watch?v=", "embed/") : null;

  return (
    <Container fluid className="Card_Contanier_detail">
      <h3>{item.name}</h3>
      <button className="ai_btn" onClick={() => nav(`/Aihelper/${item.recipeId}`)}>
        <img src={img} />
        <p>Ask..</p>
      </button>

      <div className="Card_Contanier_detail_inner">
        <div className="ifram_p_divider">
          <p>{item.instructions}</p>
          {embedUrl && <iframe src={embedUrl} title={item.name}></iframe>}
        </div>

        <div className="d-flex flex-column">
          <img src={item.imageUrl || "https://via.placeholder.com/150"} alt="Dish Img" className="img-thumbnail" />
          
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {item.recipeIngredients.map((ing, idx) => (
                <tr key={idx}>
                  <td>{ing.ingredient}</td>
                  <td>{ing.measure}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}
