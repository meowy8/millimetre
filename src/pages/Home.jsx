import MediumFilmIcon from "../components/MediumFilmIcon"
import UserList from "../components/UserList"
import { useEffect, useState } from "react"

const Home = () => {
  const [ filmDisplay, setFilmDisplay ] = useState(null)

  useEffect(() => {
    const filmListFetch = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRhYmU3YmQ5NzFiYWQ2ZWM4NjU4YTRjMGVmN2JhNSIsInN1YiI6IjYxM2UzMTYxYWFmODk3MDAyYWZjYWUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LLUybn1kgL2YjqYl7J92g_KBsO0p3hRjbSVErGVFlEc'
          }
        };

        fetch(`https://api.themoviedb.org/3/list/8289621?language=en-US&page=1`, options)
          .then(response => response.json())
          .then(data => {
           // console.log(data)
            const selectedFilms = data.items.filter((film, index) => index < 4)
            setFilmDisplay(selectedFilms)
          })
          .catch(err => console.error(err));
      } catch (error) {
        console.log(error)
      }
    }

    filmListFetch()
  }, [])

  

  return (
    <div className="flex flex-col items-center h-screen">
      <h1 className="text-3xl m-10">Home</h1>
      <div id="films-container" className="bg-[#2a1f35] flex items-center justify-center py-4 px-10 rounded-xl">
        <div className="grid grid-cols-2 gap-4">
          {filmDisplay?.map(film => {
          const posterUrl = 'https://image.tmdb.org/t/p/original/' + film.poster_path
          return <MediumFilmIcon key={film.id} id={film.id} posterUrl={posterUrl}/>
          })}
        </div>
      </div>
      <UserList />
    </div>
  )
}

export default Home