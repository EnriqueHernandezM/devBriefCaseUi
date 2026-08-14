import React from "react";
import { Link, useParams } from "react-router-dom";
import { getProjectByIdToApi } from "../api/projectsApi";
import { caseStudyCopy } from "../data/projectCaseStudyCopy";
import { projectTranslations } from "../data/projectTranslations";
import iconChevronLeft from "../icons/back.png";
import iconChevronRight from "../icons/next.png";

function hasText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function getTranslatedProject(project, language) {
  if (!project) {
    return project;
  }

  const translation = language === "en" ? projectTranslations[project.id] : null;
  const narrativeFields = [
    "summary",
    "description",
    "problem",
    "responsibilities",
    "technicalDecisions",
    "architecture",
    "results",
  ];
  const translatedProject = { ...project };

  narrativeFields.forEach((field) => {
    translatedProject[field] = translation?.[field] ?? project[field];
  });

  return translatedProject;
}

function ProjectCaseStudyCarousel({ imagesProject = [], projectName }) {
  const safeImages = Array.isArray(imagesProject) ? imagesProject : [];
  const [position, setPosition] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const hasMultipleImages = safeImages.length > 1;

  const nextImg = () => {
    setPosition((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const prevImg = () => {
    setPosition((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  React.useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const closeWithEscape = (event) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isLightboxOpen]);

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <>
      <div className="caseStudyCarousel">
        <button
          type="button"
          className="caseStudyPreviewButton"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Open project preview"
        >
          <img src={safeImages[position]} alt={projectName || "Project"} />
        </button>
      {hasMultipleImages && (
        <>
          <div className="caseStudyCarouselControls">
            <button type="button" onClick={prevImg} aria-label="Previous image">
              <img src={iconChevronLeft} alt="" aria-hidden="true" />
            </button>
            <button type="button" onClick={nextImg} aria-label="Next image">
              <img src={iconChevronRight} alt="" aria-hidden="true" />
            </button>
          </div>
          <div className="caseStudyCarouselIndicators" aria-hidden="true">
            {safeImages.map((image, index) => (
              <span
                key={image}
                className={index === position ? "activeIndicator" : ""}
              />
            ))}
          </div>
          <span className="caseStudyImageCounter">
            {position + 1} / {safeImages.length}
          </span>
        </>
      )}
      </div>
      {isLightboxOpen && (
        <div
          className="caseStudyLightbox"
          onMouseDown={() => setIsLightboxOpen(false)}
        >
          <div
            className="caseStudyLightboxContent"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="caseStudyLightboxClose"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close image preview"
            >
              x
            </button>
            <img src={safeImages[position]} alt={projectName || "Project"} />
            {hasMultipleImages && (
              <div className="caseStudyLightboxControls">
                <button type="button" onClick={prevImg} aria-label="Previous image">
                  <img src={iconChevronLeft} alt="" aria-hidden="true" />
                </button>
                <span>
                  {position + 1} / {safeImages.length}
                </span>
                <button type="button" onClick={nextImg} aria-label="Next image">
                  <img src={iconChevronRight} alt="" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ProjectSnapshot({ copy, project, projectTypeLabel, tags }) {
  const coreTags = tags.slice(0, 4);

  return (
    <aside className="caseStudySnapshot">
      {hasText(project.role) && (
        <div className="caseStudySnapshotItem">
          <span>{copy.role}</span>
          <strong>{project.role}</strong>
        </div>
      )}
      {hasText(project.projectType) && (
        <div className="caseStudySnapshotItem">
          <span>{copy.projectType}</span>
          <strong>{projectTypeLabel || project.projectType}</strong>
        </div>
      )}
      {coreTags.length > 0 && (
        <div className="caseStudySnapshotItem caseStudySnapshotStack">
          <span>{copy.coreStack}</span>
          <div>
            {coreTags.map((tag) => (
              <strong key={tag}>{tag}</strong>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default function ProjectCaseStudy({ language = "en" }) {
  const { id } = useParams();
  const [project, setProject] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const copy = caseStudyCopy[language] ?? caseStudyCopy.en;

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    getProjectByIdToApi(id)
      .then((projectData) => setProject(projectData))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <main className="caseStudyPage caseStudyState">{copy.loading}</main>;
  }

  if (hasError) {
    return <main className="caseStudyPage caseStudyState">{copy.error}</main>;
  }

  if (!project || !project.id) {
    return (
      <main className="caseStudyPage caseStudyState">{copy.notFound}</main>
    );
  }

  const renderedProject = getTranslatedProject(project, language);
  const safeTags = Array.isArray(renderedProject.tagsProject)
    ? renderedProject.tagsProject
    : [];
  const projectTypeLabel =
    copy.projectTypes[renderedProject.projectType] || renderedProject.projectType;
  const projectMeta = [projectTypeLabel, renderedProject.role]
    .filter(Boolean)
    .join(" \u00b7 ");
  const sections = [
    {
      id: "overview",
      title: copy.overview,
      content: renderedProject.description,
    },
    {
      id: "problem",
      title: copy.problem,
      content: renderedProject.problem,
    },
    {
      id: "responsibilities",
      title: copy.responsibilities,
      content: renderedProject.responsibilities,
    },
    {
      id: "architecture",
      title: copy.architecture,
      content: renderedProject.architecture,
      preserveLines: true,
    },
    {
      id: "decisions",
      title: copy.decisions,
      content: renderedProject.technicalDecisions,
    },
    {
      id: "results",
      title: copy.results,
      content: renderedProject.results,
    },
  ].filter((section) => hasText(section.content));

  return (
    <main className="caseStudyPage">
      <Link className="caseStudyBack" to="/">
        {copy.back}
      </Link>

      <header className="caseStudyHeader">
        {projectMeta && <p className="caseStudyMeta">{projectMeta}</p>}
        <h1>{renderedProject.nameProject}</h1>
        {hasText(renderedProject.summary) && (
          <p className="caseStudySummary">{renderedProject.summary}</p>
        )}
        <div className="caseStudyActions">
          {hasText(renderedProject.urlProject) && (
            <a href={renderedProject.urlProject} target="_blank" rel="noreferrer">
              {copy.liveProject}
            </a>
          )}
          {hasText(renderedProject.repositoryUrl) && (
            <a
              href={renderedProject.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              {copy.repository}
            </a>
          )}
        </div>
      </header>

      <div className="caseStudyPreviewGrid">
        <ProjectCaseStudyCarousel
          imagesProject={renderedProject.imagesProject}
          projectName={renderedProject.nameProject}
        />
        <ProjectSnapshot
          copy={copy}
          project={renderedProject}
          projectTypeLabel={projectTypeLabel}
          tags={safeTags}
        />
      </div>

      <div className="caseStudySections">
        {sections.map((section, index) => (
          <section className="caseStudySection" key={section.id}>
            <p className="caseStudySectionNumber">
              {String(index + 1).padStart(2, "0")} {section.title}
            </p>
            {section.preserveLines ? (
              <pre>{section.content}</pre>
            ) : (
              <p>{section.content}</p>
            )}
          </section>
        ))}
      </div>

      {safeTags.length > 0 && (
        <section className="caseStudyStack">
          <p>{copy.stack}</p>
          <div>
            {safeTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
