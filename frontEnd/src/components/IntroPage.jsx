/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
import { useState } from "react";
import LoginForm from "./LoginForm";

function Intropage({ type,bcolor }) {
  const [showLogin, setShowLogin] = useState(type === "Login" ? false : true);
  const [showSignup, setShowSignup] = useState(type === "Sign Up" ? false : true);
  const [toggle, setToggle] = useState(type === "Login" ? 1 : 2);

  return (
    <>
      {toggle === 1 && (
        <LoginForm bcolor={bcolor} toggle={toggle} setToggle={setToggle} show={showLogin} setShow={setShowLogin} f1={"Username"} f2={"Password"}>
          Login
        </LoginForm>
      )}
      {toggle === 2 && (
        <LoginForm  bcolor={bcolor} toggle={toggle} setToggle={setToggle} show={showSignup} setShow={setShowSignup} f1={"Enter your Username"} f2={"Enter your Password"}>
          Sign Up
        </LoginForm>
      )}
    </>
  );
}

export default Intropage;
