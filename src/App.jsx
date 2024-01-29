import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import { AuthContextProvider } from './context/AuthContext'
import UserCreate from './pages/U'

function App() {

  return (
    <AuthContextProvider>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/usercreate' element={<UserCreate />}/>
        <Route path='/:userId' element={<Profile />}/>
      </Routes>
    </AuthContextProvider> 
  )
}

export default App
