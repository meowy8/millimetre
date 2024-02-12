import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userAccount, setUserAccount] = useState();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => console.log(user), [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const userRef = doc(db, "users", "demoUser");
        const userData = await getDoc(userRef);
        setUserAccount(userData.data());
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserAccount();
  }, []);

  const logOut = () => {
    signOut(auth);
    location.reload();
  };

  console.log(userAccount);

  return (
    <AuthContext.Provider
      value={{ googleSignIn, logOut, user, userAccount, setUserAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
