import React from "react";
export default function getCarousel(images) {
  let newArr = [];
  images.forEach((el, i) => {
    const arrClass = ["img1", "img2", "img3", "img4"];

    if (images.length < 4) {
      arrClass.shift();
    }
    let addClass = arrClass[i];
    newArr.push({ img: el, nameToClass: addClass });
  });

  return newArr.map((el) => (
    <img
      key={el.img}
      className={el.nameToClass}
      src={el.img}
      alt={el.nameToClass}
    />
  ));
}
