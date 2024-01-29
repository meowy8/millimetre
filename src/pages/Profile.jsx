import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { collection, where, getDocs, query } from 'firebase/firestore'
import { db } from "../firebaseConfig"

const Profile = () => {
  const [ userProfile, setUserProfile ] = useState(null)

  const { userId } = useParams()

// change to try catch
  useEffect(() => {
    const getUserData = async () => {
      const usersCollection = collection(db, 'users')
      const usernameQuery = query(usersCollection, where('username', '==', userId))
      const querySnapshot = await getDocs(usernameQuery)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
  
        const userData = userDoc.data()
        setUserProfile(userDoc.data())
        
        console.log('User found:', userData)
      }  
    }

    getUserData()
  }, [userId])

  return (
    <>
    {userProfile && 
      <div className="flex flex-col items-center m-10 gap-4">
        <h1 className="text-3xl">Profile</h1>
        <div className="bg-red-400 w-32 h-32 rounded-full overflow-hidden flex">
          <img src={userProfile.profileImg} alt="" className=""/>
        </div>
        <span id='username'>{userProfile.username}</span>
      </div>
    }
    </>
  )
}

export default Profile