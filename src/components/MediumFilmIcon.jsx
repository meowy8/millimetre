import { Link } from "react-router-dom"

const MediumFilmIcon = ({ posterUrl, filmTitle }) => {
  return (
    <div className="w-32 h-44 overflow-hidden rounded-sm">
      <Link to={`/film/${filmTitle}`}>
        <img src={posterUrl} alt="" />
      </Link>
    </div>
  )
}

export default MediumFilmIcon