import { Link } from "react-router-dom"

const SmallUserIcon = ({ username, profileImg }) => {
  return (
    <Link to={`/${username}`} >
      <div className="w-20 h-20 rounded-full overflow-hidden flex justify-center items-center">
        <img src={profileImg} alt="" className=""/>
      </div>
    </Link>
  )
}

export default SmallUserIcon