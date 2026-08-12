import React from "react";
import { getAllProjectsToApi } from "../api/projectsApi";
import CardForProject from "./CardForProject";
import ProjectsStatus from "./ProjectsStatus";
import { homeIntro } from "../data/profileData";

export default function Home() {
  const [allProjects, setAllProjects] = React.useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = React.useState(true);
  const [hasProjectsError, setHasProjectsError] = React.useState(false);

  React.useEffect(() => {
    getAllProjectsToApi()
      .then((catchProjects) => {
        setAllProjects(Array.isArray(catchProjects) ? catchProjects : []);
        setHasProjectsError(false);
      })
      .catch(() => setHasProjectsError(true))
      .finally(() => setIsLoadingProjects(false));
  }, []);
  const generateCardsProjects = allProjects.map((el) => {
    return <CardForProject key={el.id} {...el} />;
  });
  const hasProjects = allProjects.length > 0;
  const shouldShowEmptyProjects =
    !isLoadingProjects && !hasProjectsError && !hasProjects;
  const shouldShowEndProjects =
    !isLoadingProjects && !hasProjectsError && hasProjects;
  const stackList = homeIntro.stack.join(" \u00b7 ");
  const introLinks = homeIntro.links.map((link) => (
    <a
      key={link.href}
      className={`homeIntroLink ${link.kind}`}
      href={link.href}
      target="_blank"
      rel="noreferrer"
    >
      {link.label}
    </a>
  ));

  return (
    <div className="pageHome">
      <section className="homeIntro" aria-labelledby="home-intro-title">
        <p className="homeIntroRole">{homeIntro.role}</p>
        <h2 id="home-intro-title">{homeIntro.title}</h2>
        <p className="homeIntroStack">{stackList}</p>
        <div className="homeIntroActions">{introLinks}</div>
      </section>

      <section className="projectsSection" aria-labelledby="projects-title">
        <h2 id="projects-title" className="projectsSectionTitle">
          Selected projects
        </h2>
        {isLoadingProjects && (
          <p className="projectsLoading">Loading projects...</p>
        )}
        {hasProjectsError && <ProjectsStatus variant="error" />}
        {shouldShowEmptyProjects && <ProjectsStatus variant="empty" />}
        {generateCardsProjects}
        {shouldShowEndProjects && <ProjectsStatus variant="end" />}
      </section>
    </div>
  );
}
