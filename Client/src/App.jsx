import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Hero,
  Login,
  Register,
  Profile,
  Read,
  Star,
  History,
} from "./components";

import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/read" element={<Read />} />
        <Route path="/Star" element={<Star />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
