import React from "react";
import githubLogo from "../icons/githubLogo.svg";

export default function Footer() {
  return (
    <footer className="footerContain">
      <div className="footerInner">
        <a
          className="visitTheCode"
          href="https://github.com/EnriqueHernandezM/devBriefCaseUi"
          target="_blank"
          rel="noreferrer"
        >
          <span>Look at the code</span>
          <img
            src={githubLogo}
            alt="GitHub repository"
            className="imgGitHubFooter"
          />
        </a>

        <div className="infStaf">
          <span>developed by</span>
          <p>Enrique Hernández Montiel · Mexico</p>
        </div>
      </div>
    </footer>
  );
}
