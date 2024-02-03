import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { collection, where, getDocs, query } from 'firebase/firestore'
import { db } from "../firebaseConfig"
import FavouriteFilmsDisplay from "../components/FavouriteFilmsDisplay"
import UserBio from "../components/UserBio"
import { UserAuth } from "../context/AuthContext"

const Profile = () => {
  const [ userProfile, setUserProfile ] = useState(null)
  const [ userDocId, setUserDocId ] = useState(null)

  const { userId } = useParams()
  const { user } = UserAuth()

// change to try catch
  useEffect(() => {
    const getUserData = async () => {
      const usersCollection = collection(db, 'users')
      const usernameQuery = query(usersCollection, where('username', '==', userId))
      const querySnapshot = await getDocs(usernameQuery)

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]
  
        setUserProfile(userDoc.data())
        setUserDocId(userDoc.id)
        
        //console.log('User found:', userDoc.data())
      }  
    }

    getUserData()
  }, [userId])

  useEffect(() => console.log(userProfile))

  return (
    <>
    {userProfile && 
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">Profile</h1>
        <div className="bg-red-400 w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
          <img src={userProfile.profileImg} alt="" className=""/>
        </div>
        {user?.uid === userDocId && <Link to={'/settings'} className="bg-green-900 p-2 rounded-full text-sm">Edit Profile</Link>}
        <span id='username' className="text-lg">{userProfile.username}</span>
        <UserBio bio={userProfile.bio}/>
        <FavouriteFilmsDisplay username={userProfile.username} userDataId={userDocId}/>
      </div>
    }
    </>
  )
}

export default Profile