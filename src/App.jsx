import { useState } from "react";
import LoginForm from "./components/LoginForm";
import Button from "./components/Button";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [toggle, setToggle] = useState(1);

  function handleFormSwitch(){}

  return (
    <>
      {toggle === 1 && (
        <LoginForm toggle={toggle} setToggle={setToggle} show={showLogin} setShow={setShowLogin} f1={"Username"} f2={"Password"}>
          Login
        </LoginForm>
      )}
      {toggle === 2 && (
        <LoginForm toggle={toggle} setToggle={setToggle} show={showSignup} setShow={setShowSignup} f1={"Enter your Username"} f2={"Enter your Password"}>
          Sign Up
        </LoginForm>
      )}
      <Button onClick={handleFormSwitch}>Switch between Login and Sign Up</Button>
    </>
  );
}

export default App;
