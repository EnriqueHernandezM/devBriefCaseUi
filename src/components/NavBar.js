import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
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
        <li>
          <Link className="linkKnow" to={"/know"}>
            {" "}
            I dont know
          </Link>
        </li>
      </ul>
    </header>
  );
}
