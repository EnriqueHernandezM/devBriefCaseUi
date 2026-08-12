import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SkillsPage from "./components/SkillsPage";
import Home from "./components/Home";
import Footer from "./components/Footer";
import { getLoginAdmin, loginAdmin } from "./api/adminApi";
import SideBar from "./components/SideBar";
import AdminPanel from "./components/AdminPanel";

function App() {
  const [language, setLanguage] = React.useState("en");
  const [adminForm, setAdminForm] = React.useState({
    name: "",
    password: "",
  });
  const [adminGetData, setAdminGetData] = React.useState({});

  const changesOnFormLogin = (event) => {
    setAdminForm((prevValues) => {
      const { name, value } = event.target;
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };
  //Aqui es donde tenemos que modificara para revisar las entradas qeuestan en formAdmin
  const submitFormLogin = (event, onSuccess) => {
    event.preventDefault();
    loginAdmin(adminForm)
      .then((res) => {
        setAdminGetData(res);
        if (res.session === true && typeof onSuccess === "function") {
          onSuccess();
        }
      })
      .catch((err) => err);
  };

  React.useEffect(() => {
    getLoginAdmin()
      .then((res) => setAdminGetData(res))
      .catch((err) => err);
  }, []);

  return (
    <Router>
      <div>
        <NavBar
          {...adminGetData}
          changesOnFormLogin={changesOnFormLogin}
          adminForm={adminForm}
          submitFormLogin={submitFormLogin}
          language={language}
          setLanguage={setLanguage}
        />
        <SideBar />
        <Routes>
          <Route path="/skills" element={<SkillsPage />} />
          <Route
            path="/admin_panel"
            element={
              <AdminPanel
                {...adminGetData}
                language={language}
                isReadOnlyPreview={adminGetData.session !== true}
              />
            }
          />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
