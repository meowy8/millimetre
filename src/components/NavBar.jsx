import { Link } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import LogoutButton from "./LogoutButton"

const NavBar = () => {
  const { user, userAccount } = UserAuth()

  //console.log('user account:', userAccount)
  //console.log('user:', user)

  return (
    <nav className="flex justify-between p-4 bg-[#28143e]">
      <div>
        <Link to='/'>mm</Link>
      </div>
      <div className="flex gap-4">
        <Link to={'/catalogue'}>Catalogue</Link>
        {user && <Link to={`/user/${userAccount?.username}`}>Profile</Link>}
        {user   
        ?
        <LogoutButton />
        : 
        <Link to='/signin'>Sign In</Link>}
      </div>
    </nav>
  )
}

export default NavBar