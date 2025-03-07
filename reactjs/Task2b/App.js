import React, { useState } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import Modal component

const App = () => {
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(""); // State for the date input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For Modal

  const apiKey = "YOUR_KEY";  // Replace with your NASA API Key

  // Fetch data for a specific date
  const fetchImageByDate = async (e) => {
    e.preventDefault();
    if (!date) {
      setError("Please enter a valid date.");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
      );
      setImage(response.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch data for this date. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      <h1>NASA Astronomy Picture of the Day</h1>

      {/* Input to select date */}
      <form onSubmit={fetchImageByDate}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem", marginBottom: "20px" }}
        />
        <button type="submit">Fetch Image</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {image && (
        <div className="image-card">
          <h3>{image.title}</h3>
          <p><strong>Date:</strong> {image.date}</p>
          {/* Check if the media type is image or video */}
          {image.media_type === "image" ? (
            <img
              src={image.hdurl || image.url}  // Show HD image if available
              alt={image.title}
              loading="lazy"
              style={{ width: "100%", height: "auto", borderRadius: "5px" }}
            />
          ) : (
            <iframe
              title={image.title}
              src={image.url}
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
          <p>{image.explanation}</p>
          {image.copyright && <p><strong>Copyright:</strong> {image.copyright}</p>}
          <button onClick={() => handleViewDetails(image)}>View Details</button>
        </div>
      )}

      {selectedImage && (
        <Modal image={selectedImage} closeModal={closeModal} />
      )}
    </div>
  );
};

export default App;
