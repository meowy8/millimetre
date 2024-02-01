import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LargeFilmIcon from "../components/LargeFilmIcon"

const Film = () => {
  const [ filmPageData, setFilmPageData ] = useState({})
  const [ credits, setCredits ] = useState({})
  const [ directors, setDirectors ] = useState([])

  const { filmId } = useParams()

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRhYmU3YmQ5NzFiYWQ2ZWM4NjU4YTRjMGVmN2JhNSIsInN1YiI6IjYxM2UzMTYxYWFmODk3MDAyYWZjYWUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LLUybn1kgL2YjqYl7J92g_KBsO0p3hRjbSVErGVFlEc'
          }
        };
        
        fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=en-US`, options)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setFilmPageData(data)
          })
          .catch(err => console.error(err));

          fetch(`https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`, options)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              const directorsArr = data.crew.filter(member => member.job === 'Director')
              setDirectors(directorsArr)
            })
            .catch(err => console.error(err));
      } catch (error) {
        console.log(error)
      }
    }

    fetchFilmData()
  }, [filmId])

  console.log(directors)

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <div className="flex gap-10">
        <div>
          <LargeFilmIcon posterUrl={'https://image.tmdb.org/t/p/original/' + filmPageData.poster_path}/>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{filmPageData.title}</h1>
            {directors.map(director => {
              return <span key={director.id} className="text-md text-gray-600">{director.name}</span>
            })}
          </div>
          <p>
            {filmPageData.overview}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Film