// UploadForm.js
import styled from 'styled-components';
import UploadVideo from './UploadVideo';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px); /* Adjust the height based on header height */
`;

// React component
const UploadForm = () => {
  return (
    <>
      <Container>
        <UploadVideo />
      </Container>
    </>
  );
};

export default UploadForm;
