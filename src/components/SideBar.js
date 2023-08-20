import React from "react";
import { gsap } from "gsap";
import imgProfile from "../icons/imgProfile.jpg";
export default function SideBar() {
  const [renderSideBar, setRenderSideBar] = React.useState(false);
  const [bbb, setBbb] = React.useState(false);
  gsap.registerEffect({
    name: "fadeBar",
    effect: (targets, config) => {
      return gsap.to(targets, {
        duration: 0.9,
        left: "-75%",

        display: "none",
      });
    },
    extendTimeline: true,
  });

  const watchSideBar = async (event) => {
    const { checked } = event.target;

    if (checked === false) {
      setBbb(true);
      await gsap.effects.fadeBar(".sideBar");
      setBbb(false);
    }
    setRenderSideBar((prev) => !prev);
  };
  return (
    <>
      {renderSideBar && (
        <div className="sideBar">
          <img className="imgProgfile" src={imgProfile} alt="img Profile" />
          <h3>Hello welcome to my projects page</h3>
          <h4>About me</h4>
          <p>
            My name is Enrique Hernandez Montiel, I'm 24 years old Originally
            from the State of Mexico. I have been training as a full stack
            programmer for 2 years. since I had a great interest in being able
            to develop an app from from start to finish although I prefer to
            focus more on the backend
          </p>
          <h4>Experience and challenges</h4>
          <p>
            Since I found my taste for programming I have worked 2 years in
            personal projects, Since I found my taste for programming I have
            worked 2 years in personal projects, Since I found my taste for
            programming I have worked 2 years in personal projects,s
          </p>
          <div className="containersTwoLogos">
            <div className="containerLogoGitHub">
              <a href="https://github.com/EnriqueHernandezM">
                <img
                  className="logoGitHub"
                  src="https://qph.cf2.quoracdn.net/main-qimg-729a22aba98d1235fdce4883accaf81e"
                  alt="logo GitHub"
                />
              </a>
            </div>
            <div className="containerLogoLinke">
              <a href="https://www.linkedin.com/in/enrique-hernandez-684a2323a">
                <img
                  className="logoLinke"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/640px-LinkedIn_logo_initials.png"
                  alt="logo linkenid"
                />
              </a>
            </div>
          </div>
        </div>
      )}
      <div>
        <input
          type="checkbox"
          id={bbb === true ? "containerAllSideBar" : "buttonSideBar"}
          checked={renderSideBar}
          onChange={watchSideBar}
        />
      </div>
    </>
  );
}
