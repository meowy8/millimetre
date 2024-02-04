import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import MediumFilmIcon from "./MediumFilmIcon";

const WatchedFilmsDisplay = ({ username, userDataId }) => {
  const [watchedFilmsId, setWatchedFilmsId] = useState([]);
  const [watchedFilmsData, setWatchedFilmsData] = useState([]);
  const [numOfFilmsDisplayed, setNumOfFilmsDisplayed] = useState(6)

  const { filmCatalogue } = FilmCatalogue();

  useEffect(() => {
    const fetchWatchedFilms = async () => {
      try {
        const watchedFilmsCollection = collection(
          db,
          "users",
          userDataId,
          "watched"
        );
        const collectionSnapshot = await getDocs(watchedFilmsCollection);

        if (!collectionSnapshot.empty) {
          const watchedFilmsDocs = collectionSnapshot.docs;

          watchedFilmsDocs.forEach((film) => {
            setWatchedFilmsId((prev) => [...prev, film.data().id]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchedFilms();
  }, [userDataId]);

  useEffect(() => {
    watchedFilmsId.forEach((id) => {
      const data = filmCatalogue.find((film) => film.id === id);
      setWatchedFilmsData((prev) => [...prev, data]);
    });
  }, [filmCatalogue, watchedFilmsId]);

  useEffect(() => console.log(watchedFilmsData), [watchedFilmsData]);

  const changeView = () => {
    if (numOfFilmsDisplayed === 6) {
      setNumOfFilmsDisplayed(watchedFilmsData.length)
    } else {
      setNumOfFilmsDisplayed(6)
    }
  }

  return (
    <div className="bg-[#150921] p-4">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg">Watched</span>
          <span className="font-light text-sm">
            {watchedFilmsData.length}/{filmCatalogue.length}
          </span>
        </div>
        {numOfFilmsDisplayed === 6
        ?
        <button onClick={changeView} className="text-sm">Show More</button>
        :
        <button onClick={changeView} className="text-sm">Show Less</button>
        }
      </div>
      <div className="grid grid-cols-3 gap-4">
        {watchedFilmsData.length > 0 ? (
          watchedFilmsData.map((film, index) => {
            if (index < numOfFilmsDisplayed) {
              const filmTitle = film.title.toLowerCase().split(" ").join("-");
              const posterUrl =
                "https://image.tmdb.org/t/p/original/" + film.poster_path;
              return (
                <MediumFilmIcon
                  key={film.id}
                  id={film.id}
                  filmTitle={filmTitle}
                  posterUrl={posterUrl}
                />
              );
            }
          })
        ) : (
          <p className="text-sm font-extralight rounded-lg">
            {username} has yet to choose their favourite films
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchedFilmsDisplay;