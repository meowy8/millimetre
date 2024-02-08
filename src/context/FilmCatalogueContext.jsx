import { collection, getDocs } from "firebase/firestore";
import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { db } from "../firebaseConfig";
import { UserAuth } from "./AuthContext";

const FilmCatalogueContext = createContext();

export const FilmCatalogueProvider = ({ children }) => {
  const [filmCatalogue, setFilmCatalogue] = useState([]);
  const [userWatchedFilmsData, setUserWatchedFilmsData] = useState([]);
  const [userWatchedFilmsId, setUserWatchedFilmsId] = useState([]);
  const [favouritedFilmsData, setfavouritedFilmsData] = useState([]);
  const [favFilmsCount, setFavFilmsCount] = useState(null);

  const { user } = UserAuth();

  useEffect(() => {
    const filmListFetch = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRhYmU3YmQ5NzFiYWQ2ZWM4NjU4YTRjMGVmN2JhNSIsInN1YiI6IjYxM2UzMTYxYWFmODk3MDAyYWZjYWUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LLUybn1kgL2YjqYl7J92g_KBsO0p3hRjbSVErGVFlEc",
          },
        };

        for (let pageNum = 1; pageNum <= 3; pageNum++) {
          fetch(
            `https://api.themoviedb.org/3/list/8289621?language=en-US&page=${pageNum}`,
            options,
          )
            .then((response) => response.json())
            .then((data) => {
              // console.log('Fetched data inside context', data)
              data.items.forEach((film) =>
                setFilmCatalogue((prev) => [...prev, film]),
              );
            })
            .catch((err) => console.error(err));
        }
      } catch (error) {
        console.log(error);
      }
    };

    filmListFetch();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchWatchedFilms = async () => {
        try {
          const watchedFilmsCollection = collection(
            db,
            "users",
            user.uid,
            "watched",
          );
          const collectionSnapshot = await getDocs(watchedFilmsCollection);

          if (!collectionSnapshot.empty) {
            const watchedFilmsDocs = collectionSnapshot.docs;

            watchedFilmsDocs.forEach((film) => {
              setUserWatchedFilmsId((prev) => [...prev, film.data().id]);
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchWatchedFilms();
    }
  }, [user]);

  const checkFavouritesCount = useCallback(async () => {
    const collectionRef = collection(db, "users", user.uid, "favFilms");
    try {
      const collectionSnap = await getDocs(collectionRef);
      const count = collectionSnap.size;
      return count;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      checkFavouritesCount(user.uid).then(
        (count) => count !== null && setFavFilmsCount(count),
      );
    }
  }, [user, checkFavouritesCount]);

  useEffect(() => console.log(userWatchedFilmsId), [userWatchedFilmsId]);

  return (
    <FilmCatalogueContext.Provider
      value={{
        filmCatalogue,
        userWatchedFilmsData,
        setUserWatchedFilmsData,
        favouritedFilmsData,
        setfavouritedFilmsData,
        favFilmsCount,
        setFavFilmsCount,
        checkFavouritesCount,
        userWatchedFilmsId,
        setUserWatchedFilmsId,
      }}
    >
      {children}
    </FilmCatalogueContext.Provider>
  );
};

export const FilmCatalogue = () => {
  return useContext(FilmCatalogueContext);
};
