import GoogleButton from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const SignIn = () => {
  const [userExists, setUserExists] = useState(null);
  const [username, setUsername] = useState(null);

  const { googleSignIn, user } = UserAuth();

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUserExists = async () => {
      const userRef = doc(db, "users", user.uid);
      try {
        const userDoc = await getDoc(userRef);
        setUsername(userDoc.data().username);
        setUserExists(userDoc.exists());
      } catch (error) {
        console.log(error)
      }
    };
  
    if (user) {
      checkUserExists();
      if (userExists) {
        navigate(`/${username}`);
      } else {
        navigate("/usercreate");
      }
    }
  }, [navigate, user, userExists, username])

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl m-10">Sign In</h1>
      <div>
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default SignIn;
