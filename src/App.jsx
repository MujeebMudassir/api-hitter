import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      axios.get('https://heromeals-backend.onrender.com/api/heromeals/profile/6729e75b25379e210ced5b9c ')
        .then((response) => {
          console.log(response.data)
          setData(response.data);
          setCurrentTime(new Date().toLocaleTimeString());
          setError(null); // Clear any previous error
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Failed to fetch data. Please try again later.');
        });
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 20000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <h1>API Data</h1>
      <p>Current Time: {currentTime}</p>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default App;
