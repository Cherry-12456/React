import React from 'react';
import './Modal.css'; // Import modal styles

const Modal = ({ image, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{image.title}</h2>
        <p><strong>Date:</strong> {image.date}</p>
        <img
          src={image.url}
          alt={image.title}
          style={{ width: "100%", borderRadius: "10px" }}
        />
        <p>{image.explanation}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
