import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(120); // 20 seconds countdown

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://heromeals-backend.onrender.com/api/heromeals/profile/6729e75b25379e210ced5b9c')
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          setCurrentTime(new Date().toLocaleTimeString());
          setError(null); // Clear any previous error
          setCountdown(120); // Reset countdown after each successful fetch
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again later.');
        });
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 120000); // Fetch every 20 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Countdown timer useEffect
  useEffect(() => {
    if (countdown <= 0) return; // Stop countdown at 0
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update countdown every second

    return () => clearInterval(countdownInterval); // Clear countdown interval on unmount
  }, [countdown]);

  return (
    <div>
      <h1>API Data</h1>
      <p>Current Time: {currentTime}</p>
      <div style={{display:"flex",flexDirection:"row",alignItems:"center",gap:30}}>
      <p>Next Fetch in: </p>
      <h1>{countdown} seconds</h1>
      </div>
    
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;
