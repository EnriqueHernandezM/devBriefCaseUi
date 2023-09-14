import React from "react";

export default function Footer() {
  return (
    <footer className="footerContain">
      <div className="visitTheCode">
        <h5>Look at the code</h5>
        <a href="https://github.com/EnriqueHernandezM/devBriefCaseUi">
          <img
            src="https://qph.cf2.quoracdn.net/main-qimg-729a22aba98d1235fdce4883accaf81e"
            alt="Logo Github"
            className="imgGitHubFooter"
          />
        </a>
      </div>
      <div className="otherInf">
        <h5> Other nfo</h5>
        <p>other</p>
      </div>
      <div className="infStaf">
        <h5>developed by</h5>
        <p>Enrique Hernandez Montiel</p>
        <p>Mexico</p>
      </div>
    </footer>
  );
}
