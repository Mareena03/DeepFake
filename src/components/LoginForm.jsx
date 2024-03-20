/* eslint-disable react/prop-types */
import styled from 'styled-components';
import Button from './Button';

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
const LoginForm = ({show,setShow}) => {

if (show) {
  return (
    <Modal id="myModal" className="modal" show={show}>
      <ModalContent className="modal-content">
      <span style={{float:"right"}}><Button bgColor="transparent" textColor="red" onClick={()=>setShow(false)}>X</Button></span>
        <h2 style={{textAlign:"left"}}>Login</h2>
        <form>
          <label style={{ textAlign: 'left' }}>Username:</label><br /> {/* Add textAlign style to labels */}
          <input type="text" id="username" name="username" style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }} /><br />
          <label style={{ textAlign: 'left' }}>Password:</label><br /> {/* Add textAlign style to labels */}
          <input type="password" id="password" name="password" style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }} /><br /><br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button bgColor="#00FF00" type="button" id="loginSubmit" onClick={() => setShow(false)}>
              Submit
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
  } else {
    return (
      <Button bgColor="transparent" textColor="000000" type="button" id="loginSubmit" onClick={() => setShow(true)}>
        click here to login
      </Button>
    );
  }
};

export default LoginForm;
