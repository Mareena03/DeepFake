import { useLocation } from "react-router-dom";

const ProfilePage = () => {
  const location = useLocation();
  const { username } = location.state || {};

  return (
    <div>
      <h1>Profile Page</h1>
      {username && <p>Welcome, {username}!</p>}
    </div>
  );
};

export default ProfilePage;
