import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  margin: 15% auto;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 40%;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      60deg,
      rgba(255, 255, 255, 0.1),
      transparent,
      transparent,
      transparent,
      rgba(255, 255, 255, 0.1)
    );
    transform: rotateZ(30deg) translate(-5px, 65px);
    animation: shine 5s infinite;
  }

  @keyframes shine {
    0% {
      transform: rotateZ(30deg) translate(-5px, 65px) rotate(0deg);
    }
    50% {
      transform: rotateZ(30deg) translate(-5px, 65px) rotate(180deg);
    }
    100% {
      transform: rotateZ(30deg) translate(-5px, 65px) rotate(360deg);
    }
  }
`;

const FormInput = styled.input`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 10px;
  color: #fff;
  width: calc(100% - 24px);
  margin: 5px 0 10px 0;
  transition: all 0.3s ease;

  &:hover {
    outline: none;
    border-color: cyan; /* Add cyan border on focus */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }
`;

const FormLabel = styled.label`
  color: #fff;
  text-align: left;
`;

export default function SignupForm() {
  const [showContent, setShowContent] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const showSignup = () => {
    setShowContent(true);
  };

  const closeSignup = () => {
    setShowContent(false);
  };
  const handleSignup = () => {
    // Check if either username or password field is empty
    if (!username || !password) {
      alert("Fill in both fields first");
      return; // Exit the function early if fields are empty
    }

    setShowContent(false);
    setUsername("");
    setPassword("");

    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: username, content: password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/profile");
      })
      .catch((error) => {
        error
          .json()
          .then((data) => {
            // Access the detail message from the server response
            const detailMessage = data.detail;
            console.log("Error detail:", detailMessage);

            // Display an alert or any other UI element to show the error message
            if (detailMessage === "Username already exists") {
              alert("Username already exists");
            } else if (detailMessage === "Failed to connect to the database") {
              alert("Failed to connect to the database");
            } else {
              alert(`An error occurred: ${detailMessage}`);
            }
          })
          .catch((jsonError) => {
            console.error("Error parsing JSON response:", jsonError);
          });
      });
  };

  return (
    <>
      <Button
        bradius="100px"
        bwidth="45%"
        bgcolor="green"
        textcolor="000000"
        type="button"
        id="loginSubmit"
        onClick={showSignup}
      >
        Signup
      </Button>
      {showContent && (
        <Modal>
          <ModalContent>
            <span style={{ float: "right" }}>
              {/* Use a function reference, not a function call */}
              <Button
                bradius="100px"
                border="1px solid"
                bgcolor="transparent"
                textcolor="red"
                onClick={closeSignup}
              >
                X
              </Button>
            </span>
            <h2 style={{ textAlign: "left", color: "#000" }}>Sign Up</h2>
            <form>
              <FormLabel style={{ textAlign: "left", color: "#000" }}>
                Username:
              </FormLabel>
              <FormInput
                style={{
                  width: "calc(100% - 24px)",
                  padding: "10px",
                  margin: "5px 0 10px 0",
                }}
                type="text"
                id="pa"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              ></FormInput>
              <br />
              <FormLabel style={{ textAlign: "left", color: "#000" }}>
                Password:
              </FormLabel>
              <FormInput
                style={{
                  width: "calc(100% - 24px)",
                  padding: "10px",
                  margin: "5px 0 10px 0",
                }}
                type="password"
                id="username"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormInput>
              <br></br>
              <br />
              <div>
                <Button
                  bwidth="50%"
                  bradius="100px"
                  bgcolor="#00FF00"
                  type="button"
                  onClick={handleSignup}
                  required
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
