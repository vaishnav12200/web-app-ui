import { useState } from 'react';
import './PhotoUpload.css';

function PhotoUpload({ onComplete, onBack }) {
  const [photos, setPhotos] = useState(Array(6).fill(null));

  const handleFileSelect = (index, event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos];
        newPhotos[index] = reader.result;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
  };

  const handleContinue = () => {
    const uploadedPhotos = photos.filter(photo => photo !== null);
    if (uploadedPhotos.length >= 1) {
      onComplete({ photos: uploadedPhotos });
    }
  };

  const uploadedCount = photos.filter(photo => photo !== null).length;
  const isButtonEnabled = uploadedCount >= 1;

  return (
    <div className="photo-upload-screen">
      {/* Fixed Back Arrow */}
      {onBack && (
        <button className="screen-back-btn" onClick={onBack}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="photo-upload-container">
        {/* Header */}
        <div className="photo-upload-header">
          <h1 className="photo-upload-title">Add your best photos</h1>
          <p className="photo-upload-subtitle">
            Choose clear photos of yourself
          </p>
          <p className="photo-upload-info">
            {uploadedCount}/6 photos uploaded {uploadedCount >= 1 && '✓'}
          </p>
        </div>

        {/* Photo Grid */}
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-slot">
              {photo ? (
                <div className="photo-preview">
                  <img src={photo} alt={`Upload ${index + 1}`} className="uploaded-photo" />
                  <button
                    className="remove-photo-btn"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                  {index === 0 && (
                    <div className="primary-badge">Main Photo</div>
                  )}
                </div>
              ) : (
                <label className="photo-upload-label">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(index, e)}
                    className="photo-input"
                  />
                  <div className="upload-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14m-7-7h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="upload-text">
                      {index === 0 ? 'Main Photo' : 'Add Photo'}
                    </span>
                  </div>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="photo-tips">
          <p className="tips-title">📸 Photo Tips:</p>
          <ul className="tips-list">
            <li>✅ Use clear, recent photos</li>
            <li>✅ Show your face clearly</li>
            <li>❌ No screenshots or blurred images</li>
            <li>✅ At least 1 photo required</li>
          </ul>
        </div>

        {/* Continue Button */}
        <button
          className={`photo-upload-continue-btn ${isButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleContinue}
          disabled={!isButtonEnabled}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default PhotoUpload;
