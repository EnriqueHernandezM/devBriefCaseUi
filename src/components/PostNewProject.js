import React from "react";
import { postNewProjectToApi } from "../api/projectsApi";
import { toast } from "react-toastify";
export default function PostNewProject() {
  const [valuesProject, setValuesProject] = React.useState({
    nameProject: "",
    tagsProject: "",
    description: "",
    urlProject: "",
  });
  const [images, setimages] = React.useState([]);
  const [imagesFiles, setImagesFiles] = React.useState([]);

  const postProject = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nameProject", valuesProject.nameProject);
    formData.append("tagsProject", valuesProject.tagsProject);
    formData.append("description", valuesProject.description);
    formData.append("urlProject", valuesProject.urlProject);
    if (images.length === 0 || images.length === 1) {
      toast.warn("add one more image", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }
    for (const file of imagesFiles) {
      formData.append("files", file);
    }
    postNewProjectToApi(formData)
      .then((res) => {
        if (res.session === false) {
          toast.warn(
            "Remember only Admins! You can only see this page for reading purposes",
            {
              position: "top-center",
              autoClose: 3000,
              pauseOnHover: false,
              theme: "dark",
            }
          );
        }
        if (res.succes === true) {
          window.location = "/";
        }
      })
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
    if (newImgsState.length > 4) {
      toast.warn("Remember only four images!!", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    } else if (newImgsState.length < 2) {
      toast.warn("add one more image", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }
    setimages(newImgsState);
  };
  function readmultifiles(e, indexInicial) {
    const files = e.currentTarget.files;
    setImagesFiles(files);
    const arrayImages = [];
    Object.keys(files).forEach((i) => {
      const file = files[i];
      if (file.size > 1000000) {
        toast.warn("Remember only 2mb for image!!", {
          position: "top-center",
          autoClose: 3000,
          pauseOnHover: false,
          theme: "dark",
        });
        return;
      }
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
      <h2>Add a new project </h2>
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
        Add four images to your Project up to 2mb by image
        <span className="buttonSelectFiles">Select Files </span>
        <input hidden type="file" multiple onChange={changeInputImage} />
      </label>
      {/* PREV IMAGES */}
      <div className="containerPreviewImages">
        {images.map((imagen) => (
          <div className="containerAimage" key={imagen.index}>
            <button className="" onClick={deleteImg.bind("this", imagen.index)}>
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
