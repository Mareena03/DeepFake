import { useState } from "react";
import { createGlobalStyle, keyframes } from "styled-components";
import styled from "styled-components";
import LoginAndSignupModel from "../components/LoginAndSignupModel";

// Define global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif; /* Set the desired font-family */
  }
`;

// Glowing animation for the arrow
const glow = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

// Arrow container
const ArrowContainer = styled.div`
  color: white;
  border-color: white;
  width: 0px; /* Twice the original size */
  height: 0px; /* Twice the original size */
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 30px solid #ffffff; /* Twice the original size */
  animation: ${glow} 1.5s infinite; /* Apply the glow animation */
  cursor: pointer;
  transition: transform 0.3s ease; /* Smooth transition for transform property */

  /* Rotate 90 degrees to the right on hover */
  &:hover {
    transform: rotate(90deg);
  }
`;

const Arrowtext = styled.h5`
  color: white;
  margin-left: 30px;
  animation: ${glow} 1.5s infinite;
`;

const Container1 = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 91vh;
  width: 95.3%;
  padding: 45px; /* Add padding to the container */
`;

const Header1 = styled.div`
  color: white;
  flex: 2;
  display: flex;
  align-items: center;
  transition: transform 0.5s ease; /* Smooth transition for transform property */
  transform: ${(props) =>
    props.move
      ? "translateX(42%)"
      : "none"}; /* Conditionally apply transform based on the 'move' prop */
  opacity: ${(props) =>
    props.move ? 0.2 : 1}; /* Set opacity to 0 when move is true */
`;

const Text1 = styled.div`
  color: white;
  font-size: 44px;
  margin-left: 20px; /* Add margin to the left to align with container padding */
`;

const Mainbody1 = styled.div`
  color: white;
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`;

const typing = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const MainText = styled.div`
  color: white;
  font-size: 170px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  position: relative; /* Ensure the underline position relative to the text */
  animation: ${typing} 4s steps(40, end);
  /* background-color: red; */
  transition: transform 0.5s ease; /* Smooth transition for transform property */
  transform: ${(props) => (props.move ? "translateX(70%)" : "none")};
  opacity: ${(props) =>
    props.move ? 0.2 : 1}; /* Set opacity to 0 when move is true */
`;

const Footer1 = styled.div`
  color: white;
  padding: 25px;
  flex: 3;
  display: flex;
  align-items: center;
  transition: transform 0.5s ease; /* Smooth transition for transform property */
  transform: ${(props) => (props.move ? "translateX(-70%)" : "none")};
  opacity: ${(props) =>
    props.move ? 0.2 : 1}; /* Set opacity to 0 when move is true */
`;

const TextContainer1 = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow-x: auto;
  justify-content: flex-end;
`;

const TextItem = styled.div`
  color: white;
  font-size: 20px;
  border-radius: 8px;
  padding: 20px;
  margin-left: 20px;
  white-space: nowrap;
  border: 2px solid transparent; /* Set initial border color to transparent */
  transition: border-color 0.3s; /* Smooth transition for border color change */

  &:hover {
    border-color: white; /* Change border color to white on hover */
  }
`;

export default function LandingPage() {
  const [move, setMove] = useState(false);

  const handleClick = () => {
    setMove(!move); // Toggle the move state
  };

  const LoginModel = styled.div`
    color: white;
    display: flex; /* Enable flexbox layout */
    flex-direction: column; /* Arrange children in a column */
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 90vh;
    width: 80%;
    max-width: 100%; /* Ensure the width doesn't exceed the parent element */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999; /* Ensure the modal appears on top of other content */
    /* Add any additional styling you want for the modal container */
  `;

  return (
    <>
      <GlobalStyle />
      <Container1>
        <Header1 move={move}>
          <Text1>Deep Reality</Text1>
        </Header1>
        <Mainbody1>
          <MainText move={move}>
            Introducing ...<br></br>DeepReality<hr></hr>
          </MainText>
        </Mainbody1>
        <Footer1 move={move}>
          <ArrowContainer onClick={handleClick} />{" "}
          {/* Call handleClick on click */}
          <Arrowtext>Click the arrow to Login or Sign Up</Arrowtext>
          <TextContainer1>
            <TextItem>Step 1 : Login</TextItem>
            <TextItem>Step 2 : Upload</TextItem>
            <TextItem>Step 3 : Check the Result</TextItem>
          </TextContainer1>
        </Footer1>
        {move && (
          <LoginModel>
            <LoginAndSignupModel />
          </LoginModel>
        )}
      </Container1>
    </>
  );
}
