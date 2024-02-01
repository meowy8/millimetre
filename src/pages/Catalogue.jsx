import { useEffect, useState } from "react"
import MediumFilmIcon from "../components/MediumFilmIcon"

const Catalogue = () => {
  const [ filmData, setFilmData ] = useState([])

  useEffect(() => {
    const filmDataFetch = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRhYmU3YmQ5NzFiYWQ2ZWM4NjU4YTRjMGVmN2JhNSIsInN1YiI6IjYxM2UzMTYxYWFmODk3MDAyYWZjYWUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LLUybn1kgL2YjqYl7J92g_KBsO0p3hRjbSVErGVFlEc'
          }
        };

        for (let pageNum = 1; pageNum <= 3; pageNum++) {
          fetch(`https://api.themoviedb.org/3/list/8289621?language=en-US&page=${pageNum}`, options)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              data.items.forEach(film => setFilmData(prev => [...prev, film]))
            })
            .catch(err => console.error(err));
        }

      } catch (error) {
        console.log(error)
      }
    }

    filmDataFetch()
  }, [])

  console.log(filmData)

  return (
    <div className="flex justify-center items-center">
      <div id='catalogue-container' className="grid grid-cols-2 gap-4 justify-center items-center p-4">
        {
        filmData.map(film => {
          const posterUrl = 'https://image.tmdb.org/t/p/original/' + film.poster_path
          const filmTitle = film.title.toLowerCase().split(' ').join('-')
          return <MediumFilmIcon key={film.id} posterUrl={posterUrl} filmTitle={filmTitle}/>
        })
        }
      </div>
    </div>
  )
}

export default Catalogue