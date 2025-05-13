import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import VisualizerPage from './pages/VisualizerPage/VIsualizerPage.js';
import ForgotPassPage from './pages/ForgotPassPage/ForgotPassPage.js';
import EmailNotifyPage from './pages/EmailNotifyPage/EmailNotifyPage.js';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/visualizer" element={<VisualizerPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/forgot-pass" element={<ForgotPassPage />}></Route>
          <Route path="/email-notify" element={<EmailNotifyPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
