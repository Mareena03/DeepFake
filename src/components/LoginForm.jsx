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
const LoginForm = ({ toggle, setToggle, show,setShow,children,f1,f2}) => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  function handleSubmit()
  {
    toggle === 1 ? console.log("login") : console.log("sign up");
  }

if (show) {
  return (
    <Modal id="myModal" className="modal" show={show}>
      <ModalContent className="modal-content">
      <span style={{float:"right"}}><Button bgColor="transparent" textColor="red" onClick={()=>setShow(false)}>X</Button></span>
        <h2 style={{textAlign:"left"}}>{children}</h2>
        <form>
          <label style={{ textAlign: 'left' }}>{f1}:</label><br /> 
          <input type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }} /><br />
          <label style={{ textAlign: 'left' }}>{f2}:</label><br /> 
          <input type="password" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }} /><br /><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button bgColor="#00FF00" type="button" id="loginSubmit" onClick={() => 
            {
              setShow(false);
              handleSubmit()}}>
              Submit
            </Button>
          </div>
        </form>
        <br>
        </br>
        <Button 
  bgColor="transparent" 
  textColor="red" 
  type="button"  
  onClick={() => {
    setShow(false); // Close the existing form
    setToggle(prevToggle => (prevToggle === 1 ? 2 : 1)); // Switch between login and sign up forms
    // Open the other form
    if (show) {
      setShow(prevShow => !prevShow);
    }
  }}
>
  Switch between login and Sign Up
</Button>
      </ModalContent>
    </Modal>
  );
  } else {
    return (
      <Button bgColor="red" textColor="000000" type="button" id="loginSubmit" onClick={() => setShow(true)}>
         {children}
      </Button>
    );
  }
};

export default LoginForm;
