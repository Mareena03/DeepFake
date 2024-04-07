import  { useState } from "react"
import Button from "./Button";
import styled from "styled-components";

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

export default function LoginForm() {
    const [showContent, setShowContent] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const showSignup = () => {
        setShowContent(true);
    };

    const closeSignup = () => {
        setShowContent(false);
    };
    const handleLogin=()=>{
        setShowContent(false)
        setUsername('');
        setPassword('');

            //fastapi
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
              })
              .catch(error => {
                console.error('Error:', error); // Handle errors
              });
    }


    return (
        <>
            <Button bradius="100px" bwidth="45%" bgcolor="green" textcolor="000000" type="button" id="loginSubmit" onClick={showSignup}>Login</Button>
            {showContent && 
                <Modal>
                    <ModalContent>
                        <span style={{ float: "right" }}>
                            {/* Use a function reference, not a function call */}
                            <Button bradius="100px" border="1px solid" bgcolor="transparent" textcolor="red" onClick={closeSignup}>X</Button>
                        </span>
                        <h2 style={{ textAlign: "left" }}>Login</h2>
                        <form>
                            <label style={{ textAlign: 'left' }}>Username:</label>
                            <input style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }}type="text" id="pa" value={username} onChange={(e)=>setUsername(e.target.value)} ></input>
                            <br/>
                            <label style={{ textAlign: 'left' }}>Password:</label>
                            <input style={{ width: 'calc(100% - 24px)', padding: '10px', margin: '5px 0 10px 0' }}type="password" id="username" value={password} onChange={(e)=>setPassword(e.target.value)} ></input>
                            <br/>
                            <div>
                                <Button bgcolor="#00FF00" type="button" onClick={handleLogin}>Sign Up</Button>
                            </div>
                        </form>
                    </ModalContent>
                </Modal>
            }
        </>
    );
}
