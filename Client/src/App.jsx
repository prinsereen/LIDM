import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProfileProvider } from "./app/ProfileContext";

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
    // Save the current location in localStorage
    localStorage.setItem("previousLocation", location.pathname);
  }, [location]);

  const navigateToPreviousPage = () => {
    const previousLocation = localStorage.getItem("previousLocation");
    if (previousLocation) {
      // Clear the previousLocation from localStorage
      localStorage.removeItem("previousLocation");
      // Navigate to the previous location
      return <Navigate to={previousLocation} replace />;
    }
    // If there's no previous location, navigate to the home page
    return <Navigate to="/" replace />;
  };

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
          element={user ? <Profile /> : navigateToPreviousPage()}
        />
        <Route
          path="/donatur/:id"
          element={user ? <Donatur /> : navigateToPreviousPage()}
        />
        <Route
          path="/donasi/:id"
          element={user ? <Donasi /> : navigateToPreviousPage()}
        />
        <Route
          path="/profile/edit/:id"
          element={user ? <EditProfile /> : navigateToPreviousPage()}
        />
        <Route
          path="/read/:id"
          element={user ? <Read /> : navigateToPreviousPage()}
        />
        <Route
          path="/star/:id"
          element={user ? <Star /> : navigateToPreviousPage()}
        />
        <Route
          path="/history/:id"
          element={user ? <History /> : navigateToPreviousPage()}
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
