import { useEffect, useState } from "react"
import SmallUserIcon from "./SmallUserIcon"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "../firebaseConfig"

const UserList = () => {
  const [ userData, setUserData ] = useState([])

  useEffect(() => {
    const fetchUserList = async () => {
      const usersListQuery = query(collection(db, 'users')) 
      const querySnap = await getDocs(usersListQuery)
      const fetchedUserData = querySnap.docs.map(user => ({
          profileImg: user.data().profileImg,
          username: user.data().username,
          id: user.id
      }))

      setUserData(fetchedUserData)
    }

    fetchUserList()
  }, [])
  
  console.log(userData)
  return (
    <div className="bg-green-300 m-10 p-4">
      <h1>List of Users</h1>
      <div className="grid grid-cols-3  ">
        {userData.map(user => {
          return <SmallUserIcon key={user.id} username={user.username} profileImg={user.profileImg}/>
        })}
      </div>
    </div>
  )
}

export default UserList