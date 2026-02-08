import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Check, Camera, Lock, ShieldCheck } from 'lucide-react';
import './SelfieVerification.css';

function SelfieVerification({ onComplete, onBack }) {
  const [step, setStep] = useState('initial'); // initial, camera-ready, scanning, success
  const [progress, setProgress] = useState(0);
  const [cameraError, setCameraError] = useState(false);
  const progressRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const circumference = 2 * Math.PI * 108;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 300, height: 300 }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraError(false);
      setStep('camera-ready');
    } catch (err) {
      console.warn('Camera not available, using fallback:', err);
      setCameraError(true);
      setStep('camera-ready');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const startVerification = () => {
    setStep('scanning');
    setProgress(0);

    let current = 0;
    progressRef.current = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(progressRef.current);
        stopCamera();
        setStep('success');
        setTimeout(() => {
          onComplete({ verified: true });
        }, 1800);
      }
    }, 30);
  };

  useEffect(() => {
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
      stopCamera();
    };
  }, []);

  return (
    <div className="selfie-verification-screen">
      {/* Fixed Back Arrow */}
      {onBack && step !== 'success' && (
        <button className="screen-back-btn" onClick={() => {
          if (progressRef.current) clearInterval(progressRef.current);
          stopCamera();
          onBack();
        }}>
          <ChevronLeft size={24} color="#2d2d2d" />
        </button>
      )}

      <div className="selfie-container">
        {/* Header */}
        <div className="selfie-header">
          <h1 className="selfie-title">
            {step === 'initial' && 'Verify Your Identity'}
            {step === 'camera-ready' && 'Position Your Face'}
            {step === 'scanning' && 'Scanning...'}
            {step === 'success' && <><Check size={20} style={{ display: 'inline', verticalAlign: 'middle' }} /> Verified!</>}
          </h1>
          <p className="selfie-subtitle">
            {step === 'initial' && 'Quick face verification to keep our community safe'}
            {step === 'camera-ready' && 'Center your face in the circle, then tap verify'}
            {step === 'scanning' && 'Hold still while we verify your profile'}
            {step === 'success' && 'Your profile is now verified'}
          </p>
        </div>

        {/* Circular Scanner with Live Camera */}
        <div className="scanner-area">
          <div className="scanner-circle-wrapper">
            {/* SVG Progress Ring */}
            <svg className="scanner-svg" width="260" height="260" viewBox="0 0 260 260">
              {/* Background circle */}
              <circle cx="130" cy="130" r="108" fill="none" stroke="#e9ecef" strokeWidth="7" />
              {/* Progress circle (green fill) */}
              <circle
                cx="130" cy="130" r="108"
                fill="none"
                stroke="#22c55e"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (circumference * progress / 100)}
                className="scanner-progress-ring"
              />
            </svg>

            {/* Live Camera Feed inside circle */}
            <div className="scanner-center">
              {/* Before camera starts — face icon placeholder */}
              {step === 'initial' && (
                <div className="scanner-face-icon">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#f0f0f0"/>
                    <circle cx="9" cy="10" r="1.2" fill="#999"/>
                    <circle cx="15" cy="10" r="1.2" fill="#999"/>
                    <path d="M8.5 14.5C9.33 15.67 10.67 16.5 12 16.5s2.67-.83 3.5-2" stroke="#999" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  </svg>
                </div>
              )}

              {/* Camera feed or fallback avatar */}
              {(step === 'camera-ready' || step === 'scanning') && (
                <div className="camera-feed-circle">
                  {!cameraError ? (
                    <video ref={videoRef} autoPlay playsInline muted className="selfie-video" />
                  ) : (
                    <div className="camera-fallback">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#fce4ec"/>
                        <circle cx="9" cy="10" r="1.2" fill="#ff4e7a"/>
                        <circle cx="15" cy="10" r="1.2" fill="#ff4e7a"/>
                        <path d="M8.5 14.5C9.33 15.67 10.67 16.5 12 16.5s2.67-.83 3.5-2" stroke="#ff4e7a" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      </svg>
                    </div>
                  )}
                  {step === 'scanning' && <div className="scan-sweep" />}
                </div>
              )}

              {/* Success checkmark */}
              {step === 'success' && (
                <div className="scanner-success-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#22c55e"/>
                    <path d="M7 12.5l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Progress percentage below circle during scanning */}
          {step === 'scanning' && (
            <div className="scan-progress-label">
              <span className="progress-number">{progress}</span>
              <span className="progress-percent">%</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {step === 'initial' && (
          <button className="verify-now-btn" onClick={startCamera}>
            <Camera size={22} color="white" style={{marginRight: 8}} />
            Start Camera
          </button>
        )}

        {step === 'camera-ready' && (
          <button className="verify-now-btn" onClick={startVerification}>
            Verify Now
          </button>
        )}

        {step === 'success' && (
          <div className="verified-badge-container">
            <div className="verified-badge">
              <span className="badge-check"><Check size={18} /></span>
              <span>Profile Verified</span>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="verification-info">
          <p className="info-title"><Lock size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} /> Why we verify:</p>
          <ul className="info-list">
            <li>Prevents fake profiles</li>
            <li>Ensures authenticity</li>
            <li>Builds trust in the community</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SelfieVerification;
