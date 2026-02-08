import { useState } from 'react'
import Onboarding from './components/Onboarding/Onboarding'
import Auth from './components/Auth/Auth'
import InterestSelection from './components/MainApp/InterestSelection'
import GenderSelection from './components/MainApp/GenderSelection'
import PurposeSelection from './components/MainApp/PurposeSelection'
import PhotoUpload from './components/MainApp/PhotoUpload'
import SelfieVerification from './components/MainApp/SelfieVerification'
import ProfileCompleted from './components/MainApp/ProfileCompleted'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding')
  const [userProfile, setUserProfile] = useState({})

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth')
    console.log('Onboarding completed!')
  }

  const handleAuthComplete = () => {
    setCurrentScreen('interests')
    console.log('Authentication completed!')
  }

  const handleInterestsComplete = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    setCurrentScreen('gender')
    console.log('Interests selected:', data)
  }

  const handleGenderComplete = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    setCurrentScreen('purpose')
    console.log('Gender preferences set:', data)
  }

  const handlePurposeComplete = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    setCurrentScreen('photos')
    console.log('Purpose selected:', data)
  }

  const handlePhotosComplete = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    setCurrentScreen('verification')
    console.log('Photos uploaded:', data)
  }

  const handleVerificationComplete = (data) => {
    setUserProfile(prev => ({ ...prev, ...data }))
    setCurrentScreen('completed')
    console.log('Verification completed:', data)
  }

  const handleProfileComplete = () => {
    setCurrentScreen('main')
    console.log('Ready to enter main app!', userProfile)
  }

  // Back navigation handlers
  const handleBackToAuth = () => setCurrentScreen('auth')
  const handleBackToInterests = () => setCurrentScreen('interests')
  const handleBackToGender = () => setCurrentScreen('gender')
  const handleBackToPurpose = () => setCurrentScreen('purpose')
  const handleBackToPhotos = () => setCurrentScreen('photos')

  return (
    <div className="app">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'auth' && (
        <Auth onAuthComplete={handleAuthComplete} />
      )}
      {currentScreen === 'interests' && (
        <InterestSelection onComplete={handleInterestsComplete} onBack={handleBackToAuth} />
      )}
      {currentScreen === 'gender' && (
        <GenderSelection onComplete={handleGenderComplete} onBack={handleBackToInterests} />
      )}
      {currentScreen === 'purpose' && (
        <PurposeSelection onComplete={handlePurposeComplete} onBack={handleBackToGender} />
      )}
      {currentScreen === 'photos' && (
        <PhotoUpload onComplete={handlePhotosComplete} onBack={handleBackToPurpose} />
      )}
      {currentScreen === 'verification' && (
        <SelfieVerification onComplete={handleVerificationComplete} onBack={handleBackToPhotos} />
      )}
      {currentScreen === 'completed' && (
        <ProfileCompleted onComplete={handleProfileComplete} />
      )}
      {currentScreen === 'main' && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh',
          background: 'linear-gradient(180deg, #ff8cf7 0%, #ff6b9d 50%, #ff4e7a 100%)',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          Main App Coming Soon!
        </div>
      )}
    </div>
  )
}

export default App
