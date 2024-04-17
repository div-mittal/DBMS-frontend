import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Donate from './Pages/Donate/Donate.jsx'
import FindDonor from './Pages/FindDonor/FindDonor.jsx'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/find-donor" element={<FindDonor />} />
      </Routes>
    </>
    
  )
}

export default App
