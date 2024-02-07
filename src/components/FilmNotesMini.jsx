import { Link } from "react-router-dom"
import FilmNote from "./FilmNote"

const FilmNotesMini = ({filmId, title}) => {
  return (
    <div className="bg-[#150921] p-4">
      <Link className="text-xl hover:underline" to={`/notes/${filmId}/${title}`}>Notes</Link>
      <div>
        <FilmNote filmId={filmId} title={title}/>
      </div>
    </div>
  )
}

export default FilmNotesMini