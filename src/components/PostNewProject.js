import React from "react";
import { postNewProjectToApi } from "../api/projectsApi";

export default function PostNewProject() {
  const [valuesProject, setValuesProject] = React.useState({
    nameProject: "",
    tagsProject: "",
    description: "",
    imagesProject: "",
    urlProject: "",
  });
  const [images, setimages] = React.useState([]);
  const postProject = (event) => {
    event.preventDefault();
    let tagsProject = valuesProject.tagsProject.split(",");
    const valuesToEnv = { ...valuesProject, tagsProject };
    postNewProjectToApi(valuesToEnv)
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  const changesFormNewProject = (event) => {
    setValuesProject((prevValues) => {
      const { name, value } = event.target;
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };
  const changeInputImage = (e) => {
    let indexImg;
    if (images.length > 0) {
      indexImg = images[images.length - 1].index + 1;
    } else {
      indexImg = 0;
    }
    let newImgsToState = readmultifiles(e, indexImg);
    let newImgsState = [...images, ...newImgsToState];
    setimages(newImgsState);

    console.log(newImgsState);
  };
  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;
    const arrayImages = [];
    Object.keys(files).forEach((i) => {
      const file = files[i];
      let url = URL.createObjectURL(file);
      arrayImages.push({
        index: indexInicial,
        name: file.name,
        url,
        file,
      });
      indexInicial++;
    });
    return arrayImages;
  }
  function deleteImg(indice) {
    const newImgs = images.filter(function (element) {
      return element.index !== indice;
    });
    setimages(newImgs);
  }
  return (
    <form onSubmit={postProject} className="containerFormPostNewProject">
      <h2> Agrega un proyecto nuevo a tu portafolio</h2>
      <label>
        Project Name
        <input
          type="text"
          name="nameProject"
          value={valuesProject.nameProject}
          onChange={changesFormNewProject}
          placeholder="Name of your project"
          required={true}
        />
      </label>
      <label>
        Add tags separate by comma
        <input
          type="text"
          name="tagsProject"
          value={valuesProject.tagsProject}
          onChange={changesFormNewProject}
          placeholder="Add tags"
          required={true}
        />
      </label>
      <label>
        Add a descrption
        <input
          type="text"
          name="description"
          value={valuesProject.description}
          onChange={changesFormNewProject}
          placeholder="Add your description"
          required={true}
        />
      </label>
      <label>
        Add four images to your Project
        <span className="buttonSelectFiles">Select Files </span>
        <input hidden type="file" multiple onChange={changeInputImage} />
      </label>
      {/* VIEW IMAGES */}
      <div className="containerPreviewImages">
        {images.map((imagen) => (
          <div className="containerAimage" key={imagen.index}>
            <button className="" onClick={deleteImg.bind(this, imagen.index)}>
              x
            </button>
            <img
              alt="your img"
              src={imagen.url}
              data-toggle="modal"
              data-target="#ModalPreViewImg"
              className="img-responsive"
            ></img>
          </div>
        ))}
      </div>
      <label>
        Link to the project
        <input
          type="text"
          name="urlProject"
          value={valuesProject.urlProject}
          onChange={changesFormNewProject}
          placeholder="url"
          required={true}
        />
      </label>
      <button className="buttoPostAndUpdateProject">Add new project</button>
    </form>
  );
}
