import styled from 'styled-components';
import UploadVideo from './UploadVideo';

const Header=styled.div`
  text-align: center;
  background: linear-gradient(to right, #007bff, #ff0000);
  color: #fff;
  padding: 20px;
`;
const BackgroundImage = styled.div`
  background-size: cover;
  background-position: center;
  height: 87vh;
  position: relative;
  background-image: url('../public/1.jpg');
  
  /* Flexbox properties for centering */
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center; /* Optional if you have text content */
`;

const Container=styled.div``;


// React component
const UploadForm = () => {
  return (
    <>
      <Header>
        <h1>DeepReality</h1>
      </Header>
      <BackgroundImage>
        <Container>
        <UploadVideo></UploadVideo>
        </Container>
      </BackgroundImage>
    </>
  );
};

export default UploadForm;
