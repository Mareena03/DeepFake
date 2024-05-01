// import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UploadVideo from "../components/UploadVideo";
import { useState } from "react";
import Button from "../components/Button";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 20px;
  box-sizing: border-box;
  background-color: rgb(0, 0, 0);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: url(${"../../public/2.jpg"}) no-repeat center center/cover; */
    background-color: rgba(190, 190, 190, 0.1);
    z-index: -1;
  }
`;

const Header = styled.h1`
  padding-bottom: 0px;
  color: white;
  cursor: pointer;
  font-size: 44px;
  margin-top: 20px; /* Add margin to the top */
  margin-bottom: 20px; /* Add margin to the bottom */
`;

const BodyContainer = styled.div`
  display: flex;
  height: calc(
    100vh - 88px
  ); /* Adjust height to accommodate header and margin */
  width: 100%;
`;

const Body = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightBody = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;

  flex: 1;
`;
const Text = styled.h1`
  padding-bottom: 10px;
  font-size: 20px;
  color: white;
`;
const TextContainer = styled.div`
  padding: 20px;
  /* background-color: red; */
  display: flex; /* Add display: flex; */
  justify-content: flex-start; /* Align items to the left */
`;

const ProfilePage = () => {
  const [predictionResult, setPredictionResult] = useState(true);
  const [hasResult, setHasResult] = useState(false);

  function handleClick() {
    window.location.reload();
    console.log("button clicked");
  }

  return (
    <Container>
      <Header onClick={handleClick}>Deep Reality</Header>
      <BodyContainer>
        <Body>
          <UploadVideo
            predictionResult={predictionResult}
            setPredictionResult={setPredictionResult}
            hasResult={hasResult}
            setHasResult={setHasResult}
          />
        </Body>
        <RightBody>
          <Header>Step2: Upload the Video </Header>
          <TextContainer>
            {hasResult ? (
              <>
                <Text>
                  The given video is :
                  <span style={{ color: "red", fontSize: "40px" }}>
                    {predictionResult}
                  </span>
                </Text>
                <br style={{ margin: "10px" }}></br>
                <Button
                  bgcolor="white"
                  textcolor="Black"
                  bradius="20px"
                  onClick={handleClick}
                >
                  Upload Another?
                </Button>
              </>
            ) : (
              <>
                <Text>1 Browse the Video from your device</Text>
                <Text>
                  2 Confirm your selection by pressing the upload button
                </Text>
                <Text>3 Wait for Deep Reality to process the video</Text>
              </>
            )}
          </TextContainer>
        </RightBody>
      </BodyContainer>
    </Container>
  );
};

export default ProfilePage;
