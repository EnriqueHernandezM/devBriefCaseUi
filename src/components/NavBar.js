import React from "react";
import { Link } from "react-router-dom";
import FormLoginAdmin from "./FormLoginAdmin";
import { toast } from "react-toastify";
import swal from "sweetalert";
const adminLogo =
  "https://www.clipartmax.com/png/small/5-56891_home-user-icon-user-and-laptop-ico.png";
export default function NavBar({
  session,
  msge,
  changesOnFormLogin,
  adminForm,
  submitFormLogin,
}) {
  const [renderFormLogin, setRenderFormLogin] = React.useState(false);
  const showToastMessage = () => {
    toast.info("Only Admins! You can only see this page for reading purposes", {
      position: "top-center",
      autoClose: 3000,
      pauseOnHover: false,
      theme: "dark",
    });
  };

  function getswalChangesRenderCredentials() {
    swal({
      title: "Only Admins",
      text: "You have the credentials",
      buttons: ["NO", "YES"],
    }).then((value) => {
      if (value === true) {
        setRenderFormLogin((prev) => !prev);
      }
      if (value === null) {
        showToastMessage();
        //window.location = "/know";
      }
    });
  }
  //setRenderFormLogin((prev) => !prev);

  return (
    <header className="navBar">
      <h1 className="titlePage">
        <Link className="linkHome" to="/">
          Briefcase
        </Link>
      </h1>
      <ul>
        <li>
          <Link className="linkSkills" to="/skills">
            Skills
          </Link>
        </li>
        <li className="linkKnowLi">
          <Link className="linkKnow" to={"/know"}>
            {session === true ? (
              <p>Admin panel</p>
            ) : (
              <img
                //cambiar esto para que lo haga solo cuandop carge el admin panel
                onClick={getswalChangesRenderCredentials}
                className="logoAdminConnect"
                src={adminLogo}
                alt="amdminIcon"
              />
            )}
          </Link>
        </li>
      </ul>
      {renderFormLogin && (
        <FormLoginAdmin
          changesOnFormLogin={changesOnFormLogin}
          adminForm={adminForm}
          submitFormLogin={submitFormLogin}
          setRenderFormLogin={setRenderFormLogin}
        />
      )}
    </header>
  );
}
