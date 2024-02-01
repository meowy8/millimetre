import { useContext, createContext, useEffect, useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "../firebaseConfig";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [ user, setUser ] = useState({})
  const [ userAccount, setUserAccount ] = useState(null)

  const googleSignIn = async () => { 
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  useEffect(() => console.log(user), [user])
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => {
      unsubscribe()
    }
  }, [])
  
  const logOut = () => {
    signOut(auth)
  }

  console.log(userAccount)

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, userAccount, setUserAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export const UserAuth = () => {
  return useContext(AuthContext)
}