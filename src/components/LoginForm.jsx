/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Button from './Button';
import { useState } from 'react';

// Styled components
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
`;

const LoginForm = ({ toggle, setToggle, show, setShow, children, f1, f2,bcolor }) => {
  // State for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  function handleSubmit() {
    // Determine if it's a login or sign up based on toggle state
    toggle === 1 ? console.log("login") : console.log("sign up");
  }

  // Render the login form if show is true
  if (show) {
    return (
      <Modal id="myModal" className="modal" show={show}>
        <ModalContent className="modal-content">
          {/* Close button */}
          <span style={{ float: "right" }}>
            <Button bgcolor="transparent" textcolor="red" onClick={() => {
              setShow(false);
              setUsername('');
              setPassword('');
            }}>X</Button>
          </span>
          {/* Form title */}
          <h2 style={{ textAlign: "left" }}>{children}</h2>
          {/* Form inputs */}
          <form>
            <label style={{ textAlign: 'left' }}>{f1}:</label><br />
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }}
            /><br />
            <label style={{ textAlign: 'left' }}>{f2}:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }}
            /><br /><br />
            {/* Submit button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                bgcolor="#00FF00"
                type="button"
                id="loginSubmit"
                onClick={() => {
                  setShow(false);
                  setUsername('');
                  setPassword('');
                  handleSubmit();
                }}>
                Submit
              </Button>
            </div>
          </form>
          <br />
          {/* Button to switch between login and sign up */}
          <Button
            bgcolor="transparent"
            textcolor="red"
            type="button"
            onClick={() => {
              setShow(false); // Close the existing form
              // Toggle between login and sign up forms
              setToggle(prevToggle => (prevToggle === 1 ? 2 : 1));
              // Open the other form
              if (show) {
                setShow(prevShow => !prevShow);
              }
            }}>
            Switch between login and Sign Up
          </Button>
        </ModalContent>
      </Modal>
    );
  } else {
    // Render a button to show the login form
    return (
      <Button bgcolor={bcolor} textcolor="000000" type="button" id="loginSubmit" onClick={() => setShow(true)}>
        {children}
      </Button>
    );
  }
};

export default LoginForm;
