import UserNote from "./UserNote"

const UserNotesMini = ({username}) => {
  return (
    <div className="bg-[#150921] p-4">
      <h1>Notes by {username}</h1>
      <UserNote username={username}/>
    </div>
  )
}

export default UserNotesMini