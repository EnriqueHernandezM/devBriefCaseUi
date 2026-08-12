import React from "react";
import { gsap } from "gsap";
import imgProfile from "../icons/imgProfile.jpeg";
import linkedinLogo from "../icons/linkedinLogo.svg";
import {
  knowMeCopy,
  profileContact,
  socialLinks,
} from "../data/profileData";

const socialIcons = {
  github: (
    <span className="socialTextIcon" aria-hidden="true">
      GH
    </span>
  ),
  linkedin: <img src={linkedinLogo} alt="" aria-hidden="true" />,
};

export default function SideBar({ language = "en" }) {
  const [renderSideBar, setRenderSideBar] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const sideBarRef = React.useRef(null);
  const copy = knowMeCopy[language] ?? knowMeCopy.en;

  const openSideBar = () => {
    setRenderSideBar(true);
    setIsClosing(false);
  };

  const closeSideBar = React.useCallback(() => {
    if (!renderSideBar || isClosing) {
      return;
    }

    setIsClosing(true);
    gsap.to(sideBarRef.current, {
      x: "-105%",
      opacity: 0,
      duration: 0.28,
      ease: "power2.inOut",
      onComplete: () => {
        setRenderSideBar(false);
        setIsClosing(false);
      },
    });
  }, [isClosing, renderSideBar]);

  const openOrFocusSideBar = () => {
    if (renderSideBar) {
      sideBarRef.current?.focus();
      return;
    }
    openSideBar();
  };

  React.useEffect(() => {
    if (!renderSideBar || isClosing) {
      return;
    }

    gsap.fromTo(
      sideBarRef.current,
      { x: "-105%", opacity: 0.75 },
      { x: "0%", opacity: 1, duration: 0.32, ease: "power2.out" }
    );
  }, [isClosing, renderSideBar]);

  React.useEffect(() => {
    if (!renderSideBar) {
      return;
    }

    const closeWithEscape = (event) => {
      if (event.key === "Escape") {
        closeSideBar();
      }
    };

    document.body.classList.add("sideBarIsOpen");
    window.addEventListener("keydown", closeWithEscape);

    return () => {
      document.body.classList.remove("sideBarIsOpen");
      window.removeEventListener("keydown", closeWithEscape);
    };
  }, [closeSideBar, renderSideBar]);

  const renderProfileSections = copy.sections.map((section) => (
    <section className="profileDrawerSection" key={section.id}>
      <h4>{section.title}</h4>
      {section.content.split("\n").map((text) => (
        <p key={text}>{text}</p>
      ))}
    </section>
  ));

  const renderSocialLinks = socialLinks.map((link) => (
    <a key={link.id} href={link.href} className="socialLink">
      {socialIcons[link.icon]}
      <span>{link.label}</span>
    </a>
  ));

  return (
    <>
      {renderSideBar && (
        <>
          <button
            type="button"
            className="sideBarOverlay"
            onClick={closeSideBar}
            aria-label="Close know me panel"
          />
          <aside
            id="know-me-panel"
            className="sideBar"
            ref={sideBarRef}
            role="dialog"
            aria-label="Know me"
            aria-modal="true"
            tabIndex="-1"
          >
            <button
              type="button"
              className="sideBarClose"
              onClick={closeSideBar}
              aria-label="Close know me panel"
            >
              x
            </button>

            <header className="profileDrawerHeader">
              <img className="imgProgfile" src={imgProfile} alt="img Profile" />
              <h3>{copy.greeting}</h3>
            </header>

            {renderProfileSections}

            <p className="profileDrawerClosing">{copy.closing}</p>

            <section className="profileDrawerSection profileContactSection">
              <h4>{profileContact.title}</h4>
              <a className="mailToLink" href={profileContact.emailHref}>
                {profileContact.emailLabel}
              </a>
            </section>

            <section className="profileDrawerSection socialLinksSection">
              <h4>Social links</h4>
              <div className="containersTwoLogos">{renderSocialLinks}</div>
            </section>
          </aside>
        </>
      )}
      <button
        type="button"
        className={`buttonSideBar ${renderSideBar ? "isOpen" : ""}`}
        onClick={openOrFocusSideBar}
        aria-expanded={renderSideBar}
        aria-controls="know-me-panel"
      >
        <span>know me</span>
      </button>
    </>
  );
}
