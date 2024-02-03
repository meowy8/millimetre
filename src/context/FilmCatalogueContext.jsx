import { createContext, useState, useEffect, useContext } from "react";

const FilmCatalogueContext = createContext()

export const FilmCatalogueProvider = ({children}) => {
  const [ filmCatalogue, setFilmCatalogue ] = useState([])

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

        for (let pageNum = 1; pageNum <= 3; pageNum++) {
          fetch(`https://api.themoviedb.org/3/list/8289621?language=en-US&page=${pageNum}`, options)
            .then(response => response.json())
            .then(data => {
             // console.log('Fetched data inside context', data)
              data.items.forEach(film => setFilmCatalogue(prev => [...prev, film]))
            })
            .catch(err => console.error(err));
        }

      } catch (error) {
        console.log(error)
      }
    }

    filmListFetch()
  }, [])

  //console.log('From context, film catalogue:', filmCatalogue)

  return (
    <FilmCatalogueContext.Provider value={{filmCatalogue}}>
      {children}
    </FilmCatalogueContext.Provider>
  )
}

export const FilmCatalogue = () => {
  return useContext(FilmCatalogueContext)
}