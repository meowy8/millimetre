import SmallUserIcon from "./SmallUserIcon"

const FilmNote = () => {
  return (
    <div className="bg-[#351951] p-2 flex gap-2">
      <div>
        <SmallUserIcon />
      </div>
      <div id="note-text">
        <p className="text-sm">Note text goes here</p>
      </div>
    </div>
  )
}

export default FilmNote