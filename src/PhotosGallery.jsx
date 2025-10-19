import React, { useState, useEffect } from 'react';
import './App.css';

const images = [
  '/partner-logos/Ruby%201.webp',
  '/partner-logos/Ruby%202.webp',
  '/partner-logos/Ruby%203.webp',
  '/partner-logos/Ruby%204.webp',
  '/partner-logos/Ruby%205.webp',
  '/partner-logos/Ruby%206.webp',
  '/partner-logos/Ruby%207.webp',
  '/partner-logos/Ruby%208.webp',
  '/partner-logos/Ruby9.webp',
  '/partner-logos/Ruby10.webp',
  '/partner-logos/Ruby11.webp',
  '/partner-logos/Ruby12.webp',
  '/partner-logos/Ruby13.webp'
];

export default function PhotosGallery() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSrc, setActiveSrc] = useState(null);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setModalOpen(false);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  function openModal(src) {
    setActiveSrc(src);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveSrc(null);
  }

  return (
    <div className="photos-page">
      <div className="photos-container">
        {images.map((src, idx) => (
          <div
            className="photo-card"
            key={idx}
            onClick={() => openModal(src)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') openModal(src); }}
          >
            <img src={src} alt={`photo-${idx}`} />
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="photo-modal" onClick={closeModal} role="dialog" aria-modal="true">
          <div className="photo-modal-inner" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closeModal} aria-label="Close image">×</button>
            <img src={activeSrc} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
}
