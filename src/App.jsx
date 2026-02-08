import { useState } from 'react'
import Onboarding from './components/Onboarding/Onboarding'
import Auth from './components/Auth/Auth'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding')

  const handleOnboardingComplete = () => {
    setCurrentScreen('auth')
    console.log('Onboarding completed!')
  }

  const handleAuthComplete = () => {
    setCurrentScreen('main')
    console.log('Authentication completed!')
  }

  return (
    <div className="app">
      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      {currentScreen === 'auth' && (
        <Auth onAuthComplete={handleAuthComplete} />
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
          Main App Coming Next!
        </div>
      )}
    </div>
  )
}

export default App
