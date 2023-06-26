import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileProvider } from "./app/ProfileContext";
import { useEffect } from "react";

import {
  Hero,
  Login,
  Register,
  Profile,
  History,
  Read,
  Star,
  KategoriBaca,
  KategoriDengar,
  Book,
  Summary,
  Audio,
  EditProfile,
  Donatur,
  Donasi,
  Admin,
  AdminBook,
  AdminAudio,
} from "./components";

import "./index.css";

function Root() {
  const user = Boolean(useSelector((state) => state.auth));
  const location = useLocation();

  useEffect(() => {
    window.onbeforeunload = () => {
      window.history.replaceState(null, null, location.pathname);
    };
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/:id"
          element={user ? <Admin /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/book/:id"
          element={user ? <AdminBook /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/audio/:id"
          element={user ? <AdminAudio /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/donatur/:id"
          element={user ? <Donatur /> : <Navigate to="/" />}
        />
        <Route
          path="/donasi/:id"
          element={user ? <Donasi /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/edit/:id"
          element={user ? <EditProfile /> : <Navigate to="/" />}
        />
        <Route
          path="/read/:id"
          element={user ? <Read /> : <Navigate to="/" />}
        />
        <Route
          path="/star/:id"
          element={user ? <Star /> : <Navigate to="/" />}
        />
        <Route
          path="/history/:id"
          element={user ? <History /> : <Navigate to="/" />}
        />
        <Route path="/read/kategori1/:id" element={<KategoriBaca />} />
        <Route path="/read/kategori2/:id" element={<KategoriDengar />} />
        <Route path="/read/kategori1/book/:id" element={<Book />} />
        <Route path="/read/kategori2/audio/:id" element={<Audio />} />
        <Route
          path="/read/kategori1/book/ringkasan/:id"
          element={<Summary />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ProfileProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ProfileProvider>
  );
}

export default App;
