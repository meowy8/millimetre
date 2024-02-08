import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [username, setUsername] = useState("");
  const [profileImg, setProfileImg] = useState("");

  const { user, userAccount } = UserAuth();

  useEffect(() => {
    if (userAccount) {
      setUsername(userAccount.username);
      setProfileImg(userAccount.profileImg);
    }
    console.log(username);
  }, [userAccount, username]);
  //console.log('user account:', userAccount)
  //console.log('user:', user)

  return (
    <nav className="flex justify-between items-center p-4 bg-[#28143e]">
      <div>
        <Link to="/">mm</Link>
      </div>
      <div className="flex gap-4 items-center">
        {user && (
          <Link to={`/user/${username}`} className="flex items-center gap-2">
            <div className="flex w-8 h-8 rounded-full overflow-hidden justify-center">
              <img src={profileImg} alt="" className="flex w-full h-full" />
            </div>
            {username}
          </Link>
        )}
        <Link to={"/catalogue"}>Catalogue</Link>
        {user ? <LogoutButton /> : <Link to="/signin">Sign In</Link>}
      </div>
    </nav>
  );
};

export default NavBar;
