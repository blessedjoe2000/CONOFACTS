import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import Header from "./components/Header/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost";
import ViewUserProfile from "./pages/ViewUserProfile";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";

Modal.setAppElement("#root");

function App() {
  const mode = useSelector((state) => state?.mode?.mode);

  return (
    <div id={mode === "dark" ? "dark-mode" : ""}>
      <Router>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/editpost/:id" element={<EditPost />} />
            <Route path="/viewuser/:id" element={<ViewUserProfile />} />
          </Routes>
        </div>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
