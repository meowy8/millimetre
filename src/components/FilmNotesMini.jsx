import FilmNote from "./FilmNote"

const FilmNotesMini = ({filmId, title}) => {
  return (
    <div className="bg-[#150921] p-4">
      <h1 className="text-xl">Notes</h1>
      <div>
        <FilmNote filmId={filmId} title={title}/>
      </div>
    </div>
  )
}

export default FilmNotesMini