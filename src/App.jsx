import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import SignUp from './Pages/SignUp/SignUp.jsx'
import Donate from './Pages/Donate/Donate.jsx'
import FindDonor from './Pages/FindDonor/FindDonor.jsx'
import Manage from './Pages/Manage/Manage.jsx'
import DonorResults from './Pages/Result/Result.jsx'

function App() {
  const navigate = useNavigate();

  const handleInvalidRoute = () => {
    console.log('Invalid route!');
    // Show error message or redirect to a specific page
    alert('Invalid route!');
    navigate('/home'); // Redirect to home page
  };

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
        <Route path="/manage" element={<Manage />} />
        <Route path="/results" element={<DonorResults />} />
        <Route path="*" element={handleInvalidRoute} /> {/* Handle invalid routes */}
      </Routes>
      <Footer/> 
    </>
  )
}

export default App;
