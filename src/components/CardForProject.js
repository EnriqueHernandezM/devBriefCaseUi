import React from "react";
import getCarousel from "../functions/carousel";
import iconChevronLeft from "../icons/back.png";
import iconChevronRight from "../icons/next.png";

export default function CardForProject({
  nameProject,
  tagsProject,
  description,
  imagesProject,
  urlProject,
  id,
}) {
  const fileOfImages = getCarousel(imagesProject);
  const [positionStatus, setPositionStatus] = React.useState(0);
  const [renderImgs, setRenderImgs] = React.useState(
    fileOfImages[positionStatus]
  );
  const nextImg = () => {
    const large = fileOfImages.length;
    setPositionStatus((prev) => {
      if (prev === large - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevImg = () => {
    const large = fileOfImages.length;
    setPositionStatus((prev) => {
      if (prev === 0) {
        return large - 1;
      }
      return prev - 1;
    });
  };
  React.useEffect(() => {
    setRenderImgs(fileOfImages[positionStatus]);
  }, [positionStatus]);
  const generateTags = tagsProject.map((el) => <span key={el}> {el}</span>);
  return (
    <div className="containerCardOneProject">
      <div className="carouselImgs">
        {renderImgs}
        <div className="buttonsCarousel">
          <span onClick={prevImg} className="chevronLeft">
            <img src={iconChevronLeft} alt="icon left" />
          </span>
          <span onClick={nextImg} className="chevronRight">
            <img src={iconChevronRight} alt="icon right" />
          </span>
        </div>
      </div>

      <div className="textsCard">
        <h1>{nameProject} </h1>
        <p>{description}</p>
        <a href={urlProject}> Visit </a>
        {generateTags}
      </div>
    </div>
  );
}
