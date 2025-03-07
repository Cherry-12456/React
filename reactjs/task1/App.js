import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // NASA API Key
  const apiKey = "YOUR_KEY";  // Replace with your NASA API Key

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`
        );
        setImages(response.data);
      } catch (err) {
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div className="App">
      <h1>Astronomy Pictures of the Day</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="images-container">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <h3>{image.title}</h3>
            <img
              src={image.url}
              alt={image.title}
              style={{ width: "100%", height: "auto" }}
            />
            <p>{image.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
