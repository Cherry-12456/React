import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal"; // Import Modal component

const App = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query
  const [mediaType, setMediaType] = useState("all"); // State for media type filter
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
        setFilteredImages(response.data); // Initially show all images
      } catch (err) {
        setError("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  useEffect(() => {
    const filtered = images.filter((image) => {
      // Convert date to string to handle search with date format
      const formattedDate = image.date ? image.date.toString() : "";

      // Filter by search query and media type
      const matchesSearch =
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formattedDate.includes(searchQuery);
      const matchesMediaType =
        mediaType === "all" ||
        (mediaType === "image" && image.media_type === "image") ||
        (mediaType === "video" && image.media_type === "video");

      return matchesSearch && matchesMediaType;
    });
    setFilteredImages(filtered);
  }, [searchQuery, mediaType, images]);

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

      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by title or date (YYYY-MM-DD)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: "10px", fontSize: "1rem", marginBottom: "20px" }}
      />

      {/* Media type dropdown */}
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        style={{ padding: "10px", fontSize: "1rem", marginBottom: "20px" }}
      >
        <option value="all">All Media Types</option>
        <option value="image">Images Only</option>
        <option value="video">Videos Only</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="images-container">
        {filteredImages.map((image, index) => (
          <div key={index} className="image-card">
            <h3>{image.title}</h3>
            <p><strong>Date:</strong> {image.date}</p>
            <img
              src={image.url}
              alt={image.title}
              loading="lazy"
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
