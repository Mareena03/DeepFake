import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadVideo from './UploadVideo';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Adjust the height based on header height */
`;

const UploadForm = () => {
  const [predictionResult, setPredictionResult] = useState('');

  useEffect(() => {
    // Fetch prediction result from FastAPI endpoint
    fetch("http://localhost:8000/data")
      .then(res => res.json())
      .then(data => {
        setPredictionResult(data.details); // Assuming data.details contains the prediction result
      })
      .catch(error => console.error('Error fetching prediction result:', error));

    // Cleanup function to reset the prediction result when the component is unmounted
    return () => {
      setPredictionResult('');
    };
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <Container>
      <UploadVideo />
      <h1>Message from FastAPI:</h1>
      <p>{predictionResult}</p>
    </Container>
  );
};

export default UploadForm;