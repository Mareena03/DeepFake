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
  return (
    <Container>
      <UploadVideo />
    </Container>
  );
};

export default UploadForm;
