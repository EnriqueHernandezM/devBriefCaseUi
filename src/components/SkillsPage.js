import React from "react";

import { gsap } from "gsap";
import logoHtml5 from "../icons/logoHtml5.png";
import logoFirebase from "../icons/logoFirebase.png";
import logoSql from "../icons/sqlLogo.png";

export default function SkillsPage() {
  const myImagesSkills = {
    htmlLogo: logoHtml5,
    scssLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png",
    javaScriptLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/900px-JavaScript-logo.png",
    reactLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1024px-React.svg.png",
    typeScriptLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/800px-Typescript.svg.png",
    nodeLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png",
    nestJsLogo:
      "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/nest-js-icon.png",
    gitHubLogo:
      "https://qph.cf2.quoracdn.net/main-qimg-729a22aba98d1235fdce4883accaf81e",
    awsLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png",
    bootStrapLogo:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1200px-Bootstrap_logo.svg.png",

    firebaseLogo: logoFirebase,
    mongoLogo:
      "https://dwglogo.com/wp-content/uploads/2017/12/MongoDB_logo_01.png",
    sqlLogo: logoSql,
    knexLogo: "https://knexjs.org/knex-logo.png",
    sequelizeLogo:
      "https://seeklogo.com/images/S/sequelize-logo-9A5075DB9F-seeklogo.com.png",
  };

  const onEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1.2 });
  };

  const onLeave = ({ currentTarget }) => {
    gsap.to(currentTarget, { scale: 1 });
  };
  const generate = Object.entries(myImagesSkills).map(([key, value]) => {
    return (
      <img
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`imagesSkills ${key}`}
        src={value}
        alt={key}
      />
    );
  });
  return (
    <div className="containerSkills">
      {generate}
      <div className="prob"></div>
    </div>
  );
}
