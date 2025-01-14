import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Register  from "./pages/Register/Register";
import Login from "./pages/Login/Login";

// components
import Navbar from "./component/Navbar/Navbar";
import Footer from "./component/Footer/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bout" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
