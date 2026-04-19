import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CityPage() {
  const navigate = useNavigate();

  // Fetch data from localStorage
  const ecoPoints = parseInt(localStorage.getItem('ecoPoints') || '0');
  const trees = parseInt(localStorage.getItem('trees') || '0');
  
  // Calculate completed levels from localStorage
  // QuizPage saves as completedLevels_ThemeName: [1, 2, 3...]
  // DashboardPage expects completedLevels: { ThemeName: count }
  // We will check both patterns to be safe
  const THEMES = ['Climate', 'Wildlife', 'Pollution', 'Water', 'Energy'];
  let maxLevelCompleted = 0;

  THEMES.forEach(theme => {
    const saved = JSON.parse(localStorage.getItem(`completedLevels_${theme}`) || '[]');
    if (saved.length > 0) {
      const highest = Math.max(...saved);
      if (highest > maxLevelCompleted) maxLevelCompleted = highest;
    }
  });

  // Also check the general 'completedLevels' object if it exists
  const localLevelsObj = JSON.parse(localStorage.getItem('completedLevels') || '{}');
  Object.values(localLevelsObj).forEach(val => {
    if (typeof val === 'number' && val > maxLevelCompleted) maxLevelCompleted = val;
  });

  const cityElements = [
    { level: 1, name: 'Park', icon: '🌳' },
    { level: 2, name: 'Solar House', icon: '🏠' },
    { level: 3, name: 'Recycling Center', icon: '♻️' },
    { level: 4, name: 'Wind Turbine', icon: '🌬️' },
    { level: 5, name: 'Smart Eco City', icon: '🏙️' },
  ];

  const unlockedElements = cityElements.filter(el => el.level <= maxLevelCompleted);

  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto', 
      fontFamily: 'sans-serif', 
      textAlign: 'center',
      backgroundColor: '#f0fdf4',
      minHeight: '100vh'
    }}>
      <h1 style={{ fontSize: '32px', color: '#166534', marginBottom: '10px' }}>Your Eco City 🏙️</h1>
      <p style={{ fontSize: '18px', color: '#15803d', marginBottom: '30px' }}>Witness the impact of your actions!</p>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '24px', 
        border: '2px solid #bbf7d0',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#166534' }}>City Elements Unlocked</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '20px' }}>
          {cityElements.map((el) => {
            const isUnlocked = el.level <= maxLevelCompleted;
            return (
              <div key={el.level} style={{
                padding: '15px',
                borderRadius: '16px',
                backgroundColor: isUnlocked ? '#dcfce7' : '#f1f5f9',
                border: `2px solid ${isUnlocked ? '#22c55e' : '#e2e8f0'}`,
                color: isUnlocked ? '#166534' : '#94a3b8',
                opacity: isUnlocked ? 1 : 0.6
              }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>{isUnlocked ? el.icon : '🔒'}</div>
                <div style={{ fontWeight: 'bold' }}>{el.name}</div>
                <div style={{ fontSize: '12px' }}>Level {el.level}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        marginBottom: '40px',
        backgroundColor: '#166534',
        padding: '20px',
        borderRadius: '20px',
        color: 'white'
      }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Eco Points</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{ecoPoints}</div>
        </div>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Trees Planted</div>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{trees}</div>
        </div>
      </div>

      {maxLevelCompleted >= 5 && (
        <div style={{ 
          padding: '40px', 
          backgroundColor: '#fef3c7', 
          borderRadius: '24px', 
          border: '3px solid #f59e0b',
          marginBottom: '30px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🏆</div>
          <h2 style={{ fontSize: '30px', color: '#92400e', marginBottom: '10px' }}>Eco Champion</h2>
          <p style={{ fontSize: '18px', color: '#b45309', marginBottom: '0' }}>
            Congratulations! You've built a sustainable future. Your dedication to the planet has made you a true hero!
          </p>
        </div>
      )}

      <button 
        onClick={() => navigate('/dashboard')}
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '12px',
          border: 'none',
          backgroundColor: '#22c55e',
          color: 'white',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
