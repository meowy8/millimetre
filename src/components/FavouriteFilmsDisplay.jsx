import { useEffect, useState } from "react";
import MediumFilmIcon from "./MediumFilmIcon";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FilmCatalogue } from "../context/FilmCatalogueContext";

const FavouriteFilmsDisplay = ({ username, userDataId }) => {
  const [favFilmsId, setFavFilmsId] = useState([]);
  const [favFilmsData, setFavFilmsData] = useState([]);

  const { filmCatalogue } = FilmCatalogue();

  useEffect(() => {
    const fetchFavFilms = async () => {
      try {
        const favFilmsCollection = collection(
          db,
          "users",
          userDataId,
          "favFilms",
        );
        const collectionSnapshot = await getDocs(favFilmsCollection);

        if (!collectionSnapshot.empty) {
          const favFilmsDocs = collectionSnapshot.docs;

          favFilmsDocs.forEach((film) => {
            setFavFilmsId((prev) => [...prev, film.data().id]);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFavFilms();
  }, [userDataId]);

  useEffect(() => {
    favFilmsId.forEach((id) => {
      const data = filmCatalogue.find((film) => film.id === id);
      setFavFilmsData((prev) => [...prev, data]);
    });
  }, [favFilmsId, filmCatalogue]);

  //console.log(favFilmsData)

  return (
    <div className="bg-[#231236] p-4 rounded-sm w-full">
      <div className="mb-2">
        <h1 className="text-lg">Favourites</h1>
      </div>
      <div>
        {favFilmsData.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {favFilmsData?.map((film) => {
              const filmTitle = film?.title?.toLowerCase().split(" ").join("-");
              const posterUrl =
                "https://image.tmdb.org/t/p/original/" + film?.poster_path;
              return (
                <MediumFilmIcon
                  key={film?.id}
                  id={film?.id}
                  filmTitle={filmTitle}
                  posterUrl={posterUrl}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-sm font-extralight rounded-lg">
            {username} has yet to choose their favourite films
          </p>
        )}
      </div>
    </div>
  );
};

export default FavouriteFilmsDisplay;
