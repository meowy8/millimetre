import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav className="flex justify-between p-4 bg-slate-600">
      <div>
        <Link to='/'>mm</Link>
      </div>
      <div>
        <Link to='/signin'>Sign In</Link>
      </div>
    </nav>
  )
}

export default NavBar