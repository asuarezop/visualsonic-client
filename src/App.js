import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import P5Sketch from "./sketch";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/visualizer" element={<P5Sketch />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
