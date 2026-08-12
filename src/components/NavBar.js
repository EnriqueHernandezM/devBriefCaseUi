import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FormLoginAdmin from "./FormLoginAdmin";
import AdminAccessModal from "./AdminAccessModal";
import adminLogo from "../icons/AdminLogo.png";
import { getAdminAccessCopy } from "../data/adminAccessCopy";
export default function NavBar({
  session,
  changesOnFormLogin,
  adminForm,
  submitFormLogin,
  language,
}) {
  const [renderFormLogin, setRenderFormLogin] = React.useState(false);
  const [renderAdminAccess, setRenderAdminAccess] = React.useState(false);
  const navigate = useNavigate();
  const copy = getAdminAccessCopy(language);

  const openAdminAccess = () => {
    setRenderAdminAccess(true);
  };

  const exploreAdminPanel = () => {
    setRenderAdminAccess(false);
    navigate("/admin_panel");
  };

  const showAdminSignIn = () => {
    setRenderAdminAccess(false);
    setRenderFormLogin(true);
  };

  const handleLoginSubmit = (event) => {
    submitFormLogin(event, () => {
      setRenderFormLogin(false);
      navigate("/admin_panel");
    });
  };

  return (
    <header className="navBar">
      <h1 className="titlePage">
        <Link className="linkHome" to="/">
          @Hi, I'm Monti
        </Link>
      </h1>
      <ul>
        <li>
          <Link className="navLink linkSkills" to="/skills">
            Skills
          </Link>
        </li>
        <li>
          {session === true ? (
            <Link className="navLink linkAdminPanel" to={"/admin_panel"}>
              Admin panel
            </Link>
          ) : (
            <button
              type="button"
              className="adminAccessButton"
              onClick={openAdminAccess}
              aria-label={copy.title}
            >
              <img
                className="logoAdminConnect"
                src={adminLogo}
                alt=""
                aria-hidden="true"
              />
            </button>
          )}
        </li>
      </ul>
      {renderAdminAccess && (
        <AdminAccessModal
          copy={copy}
          onClose={() => setRenderAdminAccess(false)}
          onExplore={exploreAdminPanel}
          onSignIn={showAdminSignIn}
        />
      )}
      {renderFormLogin && (
        <FormLoginAdmin
          changesOnFormLogin={changesOnFormLogin}
          adminForm={adminForm}
          submitFormLogin={handleLoginSubmit}
          setRenderFormLogin={setRenderFormLogin}
          copy={copy}
        />
      )}
    </header>
  );
}
