/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Button from './Button';
import { useState, } from 'react';

// Styled components
const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4); /* Purple shade with 40% opacity */
`;


const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 3px solid #7ed5f1;
  width: 40%;
  border-radius: 50px;
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.3);
`;

const LoginForm = ({ setToggle, show, setShow, children, f1, f2,bcolor }) => {
  // State for username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // function handleRet()
  // {
  //   fetch("http://localhost:8000/data")
  //   .then(res=>res.json())
  //   .then(data=>console.log(data))
  // }
  function handleSubmit() {
    fetch("http://localhost:8000/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: username,
        content: password,
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data); // Log response from backend
        setUsername('');
        setPassword('');
      })
      .catch(error => {
        console.error('Error:', error); // Handle errors
      });

  }



  // Render the login form if show is true
  if (show) {
    return (
      <Modal id="myModal" className="modal" show={show}>
        <ModalContent className="modal-content">
          {/* Close button */}
          <span style={{ float: "right" }}>
            <Button bradius="100px" border="1px solid" bgcolor="transparent" textcolor="red" onClick={() => {
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
            border="1px solid #333"
            bordercolor="red"
            bradius="100px"
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
            Doesnt have an account then SignUp
          </Button>
        </ModalContent>
      </Modal>
    );
  } else {
    // Render a button to show the login form
    return (<>      <Button bradius="100px" bwidth="60%" bgcolor={bcolor} textcolor="000000" type="button" id="loginSubmit" onClick={() => setShow(true)}>
        <div style={{color:"white", fontWeight:"bold", fontSize:"large"}}>{children}</div>
      </Button>
      </>
      
    );
  }
};

export default LoginForm;