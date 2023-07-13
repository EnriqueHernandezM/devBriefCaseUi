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
  const [renderImgs, setRenderImgs] = React.useState(
    getCarousel(imagesProject)
  );

  const nextImg = () => {};

  const generateTags = tagsProject.map((el) => <span key={el}> {el}</span>);
  return (
    <div className="containerCardOneProject">
      <div className="carouselImgs">
        {renderImgs}
        <div className="buttonsCarousel">
          <span className="chevronLeft">
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
