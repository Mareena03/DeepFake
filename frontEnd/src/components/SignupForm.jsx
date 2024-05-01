import { useState } from "react";
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

export default function SignupForm() {
  const [showContent, setShowContent] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const showSignup = () => {
    setShowContent(true);
  };

  const closeSignup = () => {
    setShowContent(false);
  };
  const handleSignup = () => {
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
        // Add additional logic for successful signup (e.g., redirect to login page)
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
              <label style={{ textAlign: "left", color: "#000" }}>
                Username:
              </label>
              <input
                style={{
                  width: "calc(100% - 24px)",
                  padding: "10px",
                  margin: "5px 0 10px 0",
                }}
                type="text"
                id="pa"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></input>
              <br />
              <label style={{ textAlign: "left", color: "#000" }}>
                Password:
              </label>
              <input
                style={{
                  width: "calc(100% - 24px)",
                  padding: "10px",
                  margin: "5px 0 10px 0",
                }}
                type="password"
                id="username"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
              <br />
              <div>
                <Button bgcolor="#00FF00" type="button" onClick={handleSignup}>
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
