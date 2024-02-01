import { Link } from "react-router-dom"

const MediumFilmIcon = ({ id, posterUrl, filmTitle }) => {
  return (
    <div className="w-32 h-44 overflow-hidden rounded-sm">
      <Link to={`/film/${id}/${filmTitle}`}>
        <img src={posterUrl} alt="" className="flex w-full"/>
      </Link>
    </div>
  )
}

export default MediumFilmIcon