import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import Modal component

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For Modal

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

  // Open modal when "View Details" button is clicked
  const handleViewDetails = (image) => {
    setSelectedImage(image);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <h1>Astronomy Pictures of the Day</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="images-container">
        {images.map((image, index) => (
          <div key={index} className="image-card">
            <h3>{image.title}</h3>
            <p><strong>Date:</strong> {image.date}</p>
            <img
              src={image.url}
              alt={image.title}
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
            <p>{image.explanation}</p>
            <button onClick={() => handleViewDetails(image)}>View Details</button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal image={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
