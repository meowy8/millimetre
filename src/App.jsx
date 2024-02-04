import { Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { AuthContextProvider } from "./context/AuthContext";
import UserCreate from "./pages/UserCreate";
import Film from "./pages/Film";
import Catalogue from "./pages/Catalogue";
import { FilmCatalogueProvider } from "./context/FilmCatalogueContext";
import Settings from "./pages/Settings";

function App() {
  const texturePath = "/texture.svg";

  return (
    <AuthContextProvider>
      <div className="text-white">
        <NavBar />
        <div
          style={{ backgroundImage: `url(${texturePath})` }}
          className="bg-gray-950 h-screen p-10"
        >
          <FilmCatalogueProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/film/:filmId/:title" element={<Film />} />
              <Route path="/catalogue" element={<Catalogue />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/usercreate" element={<UserCreate />} />
              <Route path="/user/:userId" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </FilmCatalogueProvider>
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
