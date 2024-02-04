import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LargeFilmIcon from "../components/LargeFilmIcon";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";

const Film = () => {
  const [filmPageData, setFilmPageData] = useState({});
  const [directors, setDirectors] = useState([]);
  const [watched, setWatched] = useState(false);

  const { user } = UserAuth();
  const navigate = useNavigate()

  const { filmId } = useParams();

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmRhYmU3YmQ5NzFiYWQ2ZWM4NjU4YTRjMGVmN2JhNSIsInN1YiI6IjYxM2UzMTYxYWFmODk3MDAyYWZjYWUwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LLUybn1kgL2YjqYl7J92g_KBsO0p3hRjbSVErGVFlEc",
          },
        };

        fetch(
          `https://api.themoviedb.org/3/movie/${filmId}?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            setFilmPageData(data);
          })
          .catch((err) => console.error(err));

        fetch(
          `https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            const directorsArr = data.crew.filter(
              (member) => member.job === "Director"
            );
            setDirectors(directorsArr);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    };

    fetchFilmData();
  }, [filmId]);

  useEffect(() => {
    if (user) {
      const checkWatchlist = async () => {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "watched",
          `${filmPageData.id}`
        );
        try {
          await getDoc(docRef).then(
            (response) => response.data() && setWatched(true)
          );
        } catch (error) {
          console.log(error);
        }
      };

      checkWatchlist();
    }
  }, [filmPageData, user]);

  const sendWatchedData = async () => {
    if (!user) {
      navigate('/signin');
    } else {
      const docRef = doc(
        db,
        "users",
        user.uid,
        "watched",
        `${filmPageData.id}`
      );
      try {
        await setDoc(docRef, {
          title: filmPageData.title,
          id: filmPageData.id,
        }).then(() => setWatched(true));
      } catch (error) {
        console.log(error);
      }
    }
    console.log("clicked");
  };

  const deleteWatchedData = async () => {
    const docRef = doc(db, "users", user.uid, "watched", `${filmPageData.id}`);
    try {
      await deleteDoc(docRef).then(() => setWatched(false));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-10 ">
      <div className="flex flex-col gap-10">
        <div className="flex justify-center">
          <LargeFilmIcon
            posterUrl={
              "https://image.tmdb.org/t/p/original/" + filmPageData.poster_path
            }
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{filmPageData.title}</h1>
            {directors.map((director) => {
              return (
                <span
                  key={director.id}
                  className="text-md font-light text-slate-400"
                >
                  {director.name}
                </span>
              );
            })}
          </div>
          <p className="">{filmPageData.overview}</p>
          {watched ? (
            <button onClick={deleteWatchedData} className="bg-green-900">
              Watched
            </button>
          ) : (
            <button className="bg-slate-900" onClick={sendWatchedData}>
              Add to Watched
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Film;
