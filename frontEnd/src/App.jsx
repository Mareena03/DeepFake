import Intropage from "./components/IntroPage";
import styled from "styled-components";
import TypingText from "./components/TypingText";
import UploadForm from "./components/UploadForm";
import { useState } from "react";
import SketchfabModel from "./components/SketchfabModel"


const Container = styled.div`
  display:flex;
  flexDirection:coloum;
  `;
  const Rightside = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  background:  #7ed5f1  ;
`;

const Heading = styled.div`
  margin: 10px;
`;

const Textsection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 1;
`;
const Leftside = styled.div`
  flex: 1;
  background: white; 
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 96vh; /* Adjust the height as needed */
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Adjust the gap between buttons as needed */
  align-items: center;
  justify-content: center;
  width:100%
`;
const Bottom = styled.div` display: flex;
gap: 10px; /* Adjust the gap between buttons as needed */
align-items: center;
justify-content: center;
width:100%`;
function App() {
  function handleAuthentication()
  {
    //if sucessfullt logined
    setLogin(true)
  }
  const [login,setLogin]=useState(false);
 if(!login)
 {
  return (
    <Container>
  <Rightside>
    <Heading><h1 style={{ color: "white", textDecoration: "underline" }}>DeepReality</h1></Heading>
    <Textsection><h1>
      <TypingText text="DeepReality : A Deepfake Detection Tool." speed={50} />
      </h1>
      </Textsection>
  </Rightside>
  <Leftside>
    <Top>
      <h1>Get Started...</h1>
      <ButtonContainer >
        <Intropage type="Login" bcolor="#7ed5f1" />
        </ButtonContainer>
      </Top>
    <Bottom>
      <button onClick={handleAuthentication}>click me </button>
    </Bottom>
  </Leftside>
</Container>
  );
 }
 else
 {
  return(
  <>
    <SketchfabModel>
      <UploadForm />
      
    </SketchfabModel>
  </>);
 }
}
 export default App;
// import SketchfabModel from "./components/SketchfabModel"
// export default function App()
// {
//   return(<>
//   <SketchfabModel></SketchfabModel>
//   </>)
// }