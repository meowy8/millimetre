import { UserAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logOut } = UserAuth();

  return <button onClick={logOut}>Logout</button>;
};

export default LogoutButton;
