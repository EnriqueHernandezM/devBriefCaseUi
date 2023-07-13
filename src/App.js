import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SkillsPage from "./components/SkillsPage";
import Home from "./components/Home";
import Footer from "./components/footer";
//import FormAdmin from "./components/FormAdmin";
import AdminPanel from "./components/AdminPanel";
function App() {
  return (
    <Router>
      <div className="">
        <NavBar />
        <Routes>
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/know" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
