import { Link } from "react-router-dom"
import UserNote from "./UserNote"

const UserNotesMini = ({username}) => {
  return (
    <div className="bg-[#150921] p-4">
      <Link to={`/notes/${username}`} className="hover:underline">Notes by {username}</Link>
      <UserNote username={username}/>
    </div>
  )
}

export default UserNotesMini