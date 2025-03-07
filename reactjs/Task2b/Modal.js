import React from "react";
import "./Modal.css"; // Import modal styles

const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{image.title}</h2>
        <p><strong>Date:</strong> {image.date}</p>
        {/* Display high resolution if it's an image, else iframe for video */}
        {image.media_type === "image" ? (
          <img
            src={image.hdurl || image.url}
            alt={image.title}
            style={{ width: "100%", borderRadius: "10px" }}
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
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
