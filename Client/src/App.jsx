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
  Book,
} from "./components";

import "./index.css";

function Root() {
  const user = Boolean(useSelector((state) => state.auth));

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/read" element={user ? <Read /> : <Navigate to="/" />} />
        <Route path="/star" element={user ? <Star /> : <Navigate to="/" />} />
        <Route
          path="/history"
          element={user ? <History /> : <Navigate to="/" />}
        />
        <Route path="/read/kategori1" element={<KategoriBaca />} />
        <Route path="/read/kategori1/book/:id" element={<Book />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
