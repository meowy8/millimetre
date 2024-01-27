import { useParams } from "react-router-dom"

const Profile = () => {

  const { userId } = useParams()

  return (
    <div className="flex flex-col items-center m-10 gap-4">
      <h1 className="text-3xl">Profile</h1>
      <div className="bg-red-400 w-32 h-32 rounded-full">
        <img src="" alt="" />
      </div>
      <span id='username'>cadaver</span>
    </div>
  )
}

export default Profile