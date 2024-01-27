import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Profile from './components/Profile'

function App() {

  return (
    <div> 
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/:userId' element={<Profile />}/>
      </Routes>
    </div>
  )
}

export default App
