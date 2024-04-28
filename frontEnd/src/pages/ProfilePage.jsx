// import { useLocation } from "react-router-dom";
import styled from "styled-components";
import UploadVideo from "../components/UploadVideo";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 20px;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${"../../public/1.jpg"}) no-repeat center center/cover;
    z-index: -1;
  }
`;

const Header = styled.h1`
  cursor: pointer;
  font-size: 55px;
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

const Body = styled.div`
  flex: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePage = () => {
  function handleClick() {
    navigate("/");
  }

  // const location = useLocation();
  // const [onaccount, setOnaccount] = useState(false);
  // const { username } = location.state || {};
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Header onClick={handleClick}>Deep Reality</Header>
        <BodyContainer>
          <Body>
            <UploadVideo></UploadVideo>
          </Body>
        </BodyContainer>
      </Container>
    </>
  );
};

export default ProfilePage;
