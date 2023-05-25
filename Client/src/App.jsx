import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Hero,
  Login,
  Register,
  Profile,
  History,
  Read,
  Star,
  KategoriBaca,
} from "./components";

import "./index.css";

function App() {
  const isAuth = Boolean(useSelector((state) => state.user));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/read" element={<Read />} />
        <Route path="/star" element={isAuth ? <Star /> : <Navigate to="/" />} />
        <Route
          path="/history"
          element={isAuth ? <History /> : <Navigate to="/" />}
        />
        <Route path="/read/kategori1" element={<KategoriBaca />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
