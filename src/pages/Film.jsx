import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LargeFilmIcon from "../components/LargeFilmIcon";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { UserAuth } from "../context/AuthContext";
import AddToWatchedButton from "../components/AddToWatchedButton";
import AddToFavouritesButton from "../components/AddToFavouritesButton";
import { FilmCatalogue } from "../context/FilmCatalogueContext";
import FilmNotesMini from "../components/FilmNotesMini";
import CreateNoteModal from "../components/CreateNoteModal";
import generateRandomID from "../functions/generateRandomId";

const Film = () => {
  const [filmPageData, setFilmPageData] = useState({});
  const [directors, setDirectors] = useState([]);
  const [watched, setWatched] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [favSlotsFull, setFavSlotsFull] = useState(null);
  const [modalDisplay, setModalDisplay] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [dataSentToUserNotes, setDataSentToUserNotes] = useState(false);
  const [dataSentToFilmNotes, setDataSentToFilmNotes] = useState(false);

  const { user, userAccount } = UserAuth();
  const { favFilmsCount, setFavFilmsCount, checkFavouritesCount } =
    FilmCatalogue();
  const navigate = useNavigate();

  const { filmId, title } = useParams();

  useEffect(() => {
    // console.log("favourited?", favourited);
    // console.log("fav count?", favFilmsCount);
    // console.log("watched?", watched);
    //console.log('modal display:', modalDisplay)
    // console.log("note content:", noteContent);
    // console.log('film page data:', filmPageData)
    console.log("user account:", userAccount);
  }, [
    favourited,
    favFilmsCount,
    watched,
    modalDisplay,
    noteContent,
    filmPageData,
    userAccount,
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
          const fetchedDoc = await getDoc(docRef);
          fetchedDoc.exists() && setWatched(true);
        } catch (error) {
          console.log(error);
        }
      };

      checkWatchlist();
    }
  }, [filmPageData, user]);

  useEffect(() => {
    if (user) {
      const checkFavsList = async () => {
        const docRef = doc(
          db,
          "users",
          user.uid,
          "favFilms",
          `${filmPageData.id}`
        );
        try {
          const fetchedData = await getDoc(docRef);
          fetchedData.exists() ? setFavourited(true) : setFavourited(false);
        } catch (error) {
          console.log(error);
        }
      };

      checkFavsList();
    }
  }, [filmPageData, user]);

  useEffect(() => {
    if (favFilmsCount === 3) {
      setFavSlotsFull(true);
    } else {
      setFavSlotsFull(false);
    }
  }, [favFilmsCount]);

  const sendWatchedData = async () => {
    if (!user) {
      navigate("/signin");
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

  const sendFavouritesData = async () => {
    if (!user) {
      navigate("/signin");
    } else if (favFilmsCount < 3 && favFilmsCount !== null) {
      const docRef = doc(
        db,
        "users",
        user.uid,
        "favFilms",
        `${filmPageData.id}`
      );
      try {
        await setDoc(docRef, {
          id: filmPageData.id,
          title: filmPageData.title,
        }).then(() => {
          setFavourited(true);
          checkFavouritesCount().then((count) => setFavFilmsCount(count));
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteFavouritesData = async () => {
    const docRef = doc(db, "users", user.uid, "favFilms", `${filmPageData.id}`);
    try {
      await deleteDoc(docRef).then(() => setFavourited(false));
      checkFavouritesCount().then((count) => setFavFilmsCount(count));
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  const openModal = () => {
    setModalDisplay(true);
  };

  const sendNotetoUserNotes = async (noteId) => {
    const docRef = doc(db, "users", user.uid, "notes", noteId);
    try {
      await setDoc(docRef, {
        filmId,
        noteId,
        noteContent,
        posterUrl:
          "https://image.tmdb.org/t/p/original/" + filmPageData.poster_path,
        filmTitle: filmPageData.title,
        type: "user note",
        userId: user.uid,
      }).then(() => setDataSentToUserNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotetoFilmNotes = async (noteId) => {
    const docRef = doc(db, "filmNotes", filmId, "notes", noteId);
    try {
      await setDoc(docRef, {
        filmId,
        noteId,
        noteContent,
        postedBy: userAccount.username,
        profileImg: userAccount.profileImg,
        filmTitle: filmPageData.title,
        type: "film note",
        userId: user.uid,
      }).then(() => setDataSentToFilmNotes(true));
    } catch (error) {
      console.log(error);
    }
  };

  const sendAllNoteData = async () => {
    const noteId = generateRandomID();
    try {
      await Promise.all([
        sendNotetoFilmNotes(noteId),
        sendNotetoUserNotes(noteId),
      ]);

      closeModal();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataSentToFilmNotes && dataSentToUserNotes ? closeModal() : null;
  }, [dataSentToFilmNotes, dataSentToUserNotes]);

  return (
    <div className=" max-w-[1000px]">
      <div className="flex flex-col items-center p-10 ">
        <div className="flex flex-col gap-10 items-center">
          <div className="md:flex gap-10 px-10 justify-center">
            <div className="flex justify-center md:block">
              <LargeFilmIcon
                posterUrl={
                  "https://image.tmdb.org/t/p/original/" +
                  filmPageData.poster_path
                }
              />
            </div>
            <div className="flex flex-col md:w-2/5 lg:w-3/5">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-semibold mt-8 md:m-0">{filmPageData.title}</h1>
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
              <p className="mt-6 ">{filmPageData.overview}</p>
              <AddToWatchedButton
                deleteWatchedData={deleteWatchedData}
                watched={watched}
                sendWatchedData={sendWatchedData}
              />
              <AddToFavouritesButton
                sendFavouritesData={sendFavouritesData}
                favourited={favourited}
                deleteFavouritesData={deleteFavouritesData}
                favSlotsFull={favSlotsFull}
              />
            </div>
          </div>
          <FilmNotesMini
            filmId={filmId}
            title={title}
            openModal={openModal}
            user={user}
          />
        </div>
      </div>
      {modalDisplay && (
        <CreateNoteModal
          sendAllNoteData={sendAllNoteData}
          noteContent={noteContent}
          setNoteContent={setNoteContent}
          filmTitle={filmPageData.title}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Film;
