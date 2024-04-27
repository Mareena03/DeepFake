import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UploadVideo from "../components/UploadVideo";

const Container = styled.div`
  background-color: black;
  color: white; /* Set text color to white */
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column; /* Align children in a column */
  justify-content: center; /* Center children vertically */
  align-items: left; /* Align children horizontally to the left */
  padding: 20px; /* Add padding to the container */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
`;

const Header = styled.h1`
  font-size: 30px;
  margin-top: 20px; /* Add margin to the top */
  margin-bottom: 20px; /* Add margin to the bottom */
`;

const BodyContainer = styled.div`
  display: flex;
  height: calc(
    100vh - 88px
  ); /* Adjust height to accommodate header and margin */
  width: 100%;
`;

const LeftBar = styled.div`
  flex: 2;
`;

const Body = styled.div`
  flex: 10;
  display: flex;
  background-color: red;
  justify-content: center;
  align-items: center;
`;

const Account = styled.div`
  justify-content: center;
  padding: 10px;
  text-align: center;
  align-items: center;
`;

const DropDown = styled.div`
  text-align: left;
`;

const H3 = styled.h3`
  margin-left: 40px;
`;

const ProfilePage = () => {
  const location = useLocation();
  const [onaccount, setOnaccount] = useState(false);
  const { username } = location.state || {};

  return (
    <>
      <Container>
        <Header>Deep Reality</Header>
        <BodyContainer>
          <Body>
            <UploadVideo></UploadVideo>
          </Body>
          <LeftBar>
            <Account onClick={() => setOnaccount(!onaccount)}>
              <h2> User : {username}</h2>
              {onaccount ? (
                <DropDown>
                  <H3>Upload Video</H3>
                  <H3>Logout</H3>
                </DropDown>
              ) : (
                <></>
              )}
            </Account>
          </LeftBar>
        </BodyContainer>
      </Container>
    </>
  );
};

export default ProfilePage;
