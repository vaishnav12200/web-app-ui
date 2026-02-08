import { useState } from 'react';
import { ChevronLeft, X, Plus, Camera, Check, XCircle } from 'lucide-react';
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
          <ChevronLeft size={24} color="#2d2d2d" />
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
            {uploadedCount}/6 photos uploaded {uploadedCount >= 1 && <Check size={16} style={{ display: 'inline', verticalAlign: 'middle', marginLeft: 4 }} />}
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
                    <X size={20} color="white" />
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
                    <Plus size={40} />
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
          <p className="tips-title"><Camera size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Photo Tips:</p>
          <ul className="tips-list">
            <li><Check size={14} color="#22c55e" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Use clear, recent photos</li>
            <li><Check size={14} color="#22c55e" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />Show your face clearly</li>
            <li><XCircle size={14} color="#ef4444" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />No screenshots or blurred images</li>
            <li><Check size={14} color="#22c55e" style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />At least 1 photo required</li>
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
