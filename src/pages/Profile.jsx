import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDoc, doc, getFirestore } from 'firebase/firestore'
import { app } from "../firebaseConfig"

const Profile = () => {
  const [ user, setUser ] = useState(null)

  const { userId } = useParams()

  const db = getFirestore(app)

// change to try catch
  const getUserData = async () => {
    const docRef = doc(db, 'users', userId)
    await getDoc(docRef)
    .then(doc => setUser(doc.data()))
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
    {user && 
      <div className="flex flex-col items-center m-10 gap-4">
        <h1 className="text-3xl">Profile</h1>
        <div className="bg-red-400 w-32 h-32 rounded-full overflow-hidden flex">
          <img src={user.profileImg} alt="" className=""/>
        </div>
        <span id='username'>{user.username}</span>
      </div>
    }
    </>
  )
}

export default Profile