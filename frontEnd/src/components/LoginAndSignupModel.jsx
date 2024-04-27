import styled from "styled-components";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Top = styled.div`
  height: 100vh; /* Set the height to the full viewport height */
  width: 70vw; /* Set the width to the full viewport width */
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  padding: 40px;
  width: 70%; /* Set the desired width for the content container */
  text-align: center; /* Center the text content horizontally */
`;

export default function LoginAndSignupModel() {
  return (
    <>
      <Top>
        <h1>Get Started...</h1>
        <ButtonContainer>
          <SignupForm></SignupForm>
          <LoginForm></LoginForm>
        </ButtonContainer>
      </Top>
    </>
  );
}
