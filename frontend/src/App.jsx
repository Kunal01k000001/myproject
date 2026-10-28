import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import Registrationform from './components/Registrationform';
import Loginform from './components/Loginform';
import './App.css';
import Profile from './components/profile';

import ForgotPassword from './components/forgotpassword';
import ResetPassword from './components/Resetpassword';
import Adminmessage from './components/Adminmessage';
import Mymessage from './components/Mymessage';

function App() {
  return (
    <>
     
      <main>
        <Routes>
          <Route element={<Navbar/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path='/profile'  element={<Profile/>}/>
          <Route path="/my-messages" element={<Mymessage/>} />
           
          </Route>

          <Route path="/register" element={<Registrationform />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Loginform />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/adminmessage' element={<Adminmessage/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
