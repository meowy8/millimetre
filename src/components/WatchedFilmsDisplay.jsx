import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import MediumFilmIcon from "./MediumFilmIcon";
import { UserAuth } from "../context/AuthContext";

const WatchedFilmsDisplay = ({ username, userDataId }) => {
  const [numOfFilmsDisplayed, setNumOfFilmsDisplayed] = useState(6);
  const [profileWatchedFilmsId, setProfileWatchedFilmsId] = useState([]);
  const [profileWatchedFilmsData, setProfileWatchedFilmsData] = useState([]);

  const { user } = UserAuth();

  const { filmCatalogue } = FilmCatalogue();

  useEffect(() => {
    setProfileWatchedFilmsId([])
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
            setProfileWatchedFilmsId((prev) => [...prev, film.data().id]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchWatchedFilms();
  }, [userDataId, setProfileWatchedFilmsId, user]);

  useEffect(() => {
    setProfileWatchedFilmsData([]);
    profileWatchedFilmsId.forEach((id) => {
      const data = filmCatalogue.find((film) => film.id === id);
      setProfileWatchedFilmsData((prev) => [...prev, data]);
    });
  }, [filmCatalogue, profileWatchedFilmsId, setProfileWatchedFilmsData]);

  //useEffect(() => console.log(watchedFilmsData), [watchedFilmsData]);

  const changeView = () => {
    if (numOfFilmsDisplayed === 6) {
      setNumOfFilmsDisplayed(profileWatchedFilmsData.length);
    } else {
      setNumOfFilmsDisplayed(6);
    }
  };

  return (
    <div className="bg-[#150921] p-4">
      <div className="mb-2 flex justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-lg">Watched</h1>
          <span className="font-light text-sm">
            {profileWatchedFilmsData.length}/{filmCatalogue.length}
          </span>
        </div>
        <div>
          {profileWatchedFilmsData.length > 6 ? (
            numOfFilmsDisplayed === 6 ? (
              <button onClick={changeView} className="text-sm">
                Show More
              </button>
            ) : (
              <button onClick={changeView} className="text-sm">
                Show Less
              </button>
            )
          ) : null}
        </div>
      </div>
      <div>
        {profileWatchedFilmsData.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {profileWatchedFilmsData.map((film, index) => {
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
            })}
          </div>
        ) : (
          <p className="text-sm font-extralight rounded-lg">
            {username} has yet to watch any films
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchedFilmsDisplay;
