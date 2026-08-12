import React from "react";
export default function getCarousel(images) {
  let newArr = [];
  const safeImages = Array.isArray(images) ? images : [];
  safeImages.forEach((el, i) => {
    const arrClass = ["img1", "img2", "img3", "img4"];

    if (safeImages.length < 4) {
      arrClass.shift();
    }
    let addClass = arrClass[i];
    newArr.push({ img: el, nameToClass: addClass });
  });

  return newArr.map((el) => (
    <img
      key={el.img}
      className={`projectCarouselImage ${el.nameToClass}`}
      src={el.img}
      alt={el.nameToClass}
    />
  ));
}
