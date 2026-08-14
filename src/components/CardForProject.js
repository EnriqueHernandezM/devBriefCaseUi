import React from "react";
import { Link } from "react-router-dom";
import getCarousel from "../functions/carousel";
import iconChevronLeft from "../icons/back.png";
import iconChevronRight from "../icons/next.png";

export default function CardForProject({
  nameProject,
  tagsProject,
  projectType,
  role,
  summary,
  description,
  imagesProject,
  id,
}) {
  const fileOfImages = getCarousel(imagesProject);
  const [positionStatus, setPositionStatus] = React.useState(0);
  const [renderImgs, setRenderImgs] = React.useState(
    fileOfImages[positionStatus]
  );
  const hasMultipleImages = fileOfImages.length > 1;

  const projectTypeLabels = {
    client: "Client project",
    professional: "Professional project",
    personal: "Personal project",
  };

  const nextImg = () => {
    const large = fileOfImages.length;
    if (large === 0) {
      return;
    }
    setPositionStatus((prev) => {
      if (prev === large - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevImg = () => {
    const large = fileOfImages.length;
    if (large === 0) {
      return;
    }
    setPositionStatus((prev) => {
      if (prev === 0) {
        return large - 1;
      }
      return prev - 1;
    });
  };
  React.useEffect(() => {
    setRenderImgs(fileOfImages[positionStatus]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionStatus, imagesProject]);
  const safeTags = Array.isArray(tagsProject) ? tagsProject : [];
  const generateTags = safeTags.map((el) => <span key={el}>{el}</span>);
  const indicators = fileOfImages.map((el, index) => (
    <button
      type="button"
      key={el.key || index}
      className={index === positionStatus ? "activeIndicator" : ""}
      onClick={() => setPositionStatus(index)}
      aria-label={`Show project image ${index + 1}`}
    />
  ));
  const textProject = summary || description || "";
  const projectMeta = [projectTypeLabels[projectType] || projectType, role]
    .filter(Boolean)
    .join(" \u00b7 ");

  return (
    <div className="containerCardOneProject">
      <div className="carouselImgs">
        {renderImgs}
        {hasMultipleImages && (
          <>
            <div className="buttonsCarousel">
              <button type="button" onClick={prevImg} className="chevronLeft">
                <img src={iconChevronLeft} alt="Previous project" />
              </button>
              <button type="button" onClick={nextImg} className="chevronRight">
                <img src={iconChevronRight} alt="Next project" />
              </button>
            </div>
            <div className="carouselIndicators">{indicators}</div>
          </>
        )}
      </div>

      <div className="textsCard">
        {projectMeta && <p className="projectMeta">{projectMeta}</p>}
        <h1>{nameProject} </h1>
        <p className="projectSummary">{textProject}</p>
        <div className="projectTags">{generateTags}</div>
        <Link className="projectCardCta" to={`/projects/${id}`}>
          View case study {"\u2192"}
        </Link>
      </div>
    </div>
  );
}
