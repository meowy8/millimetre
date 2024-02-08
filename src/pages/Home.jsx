import MediumFilmIcon from "../components/MediumFilmIcon";
import UserList from "../components/UserList";
import { useEffect, useState } from "react";
import WelcomeSection from "../components/WelcomeSection";
import HomeFilmDisplay from "../components/HomeFilmDisplay";

const Home = () => {
  const [filmDisplay, setFilmDisplay] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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

        fetch(
          `https://api.themoviedb.org/3/list/8289621?language=en-US&page=1`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data)
            const selectedFilms = data.items.filter((film, index) => index < 4);
            setFilmDisplay(selectedFilms);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log(error);
      }
    };

    filmListFetch();
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center">
      <WelcomeSection />
      <HomeFilmDisplay filmDisplay={filmDisplay}/>
      <UserList />
    </div>
  );
};

export default Home;
