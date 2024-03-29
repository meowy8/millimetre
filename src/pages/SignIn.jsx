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

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    const checkUserExists = async () => {
      const userRef = doc(db, "users", user.uid);
      try {
        const userDoc = await getDoc(userRef);
        setUsername(userDoc.data().username);
        setUserExists(userDoc.exists());
      } catch (error) {
        console.log(error);
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
  }, [navigate, user, userExists, username]);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#150921] p-4 m-10 h-full">
      <div className="flex flex-col items-center bg-black/50 h-full p-4">
        <h1 className="text-3xl pt-4">Sign In</h1>
        <div className="p-10">
          <GoogleButton onClick={handleGoogleSignIn} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
