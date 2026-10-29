import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ContactPage from './pages/ContactPage';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import './App.css';
import Profile from './components/Profile';


import ResetPassword from './components/ResetPassword';
import AdminMessage from './components/AdminMessage';
import MyMessage from './components/MyMessage';
import ForgotPassword from './components/ForgotPassword';


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
          <Route path="/my-messages" element={<MyMessage/>} />
           
          </Route>

          <Route path="/register" element={<RegistrationForm />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path='/adminmessage' element={<AdminMessage/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
