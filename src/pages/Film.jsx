import { useState } from "react"

const Film = () => {
  const [ filmPageData, setFilmPageData ] = useState()

  return (
    <div className="flex flex-col">
      <h1>Film Name</h1>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  )
}

export default Film