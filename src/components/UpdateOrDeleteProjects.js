import React from "react";
import { toast } from "react-toastify";
export default function UpdateOrDeleteProjects(allRecived) {
  const [renderPrevViewUpdate, setRenderPrevViewUpdate] = React.useState({
    render: false,
    idToModief: 0,
  });
  const [imagesPreview, setimagesPreview] = React.useState([]);
  const [imagesFilesPut, setImagesFilesPut] = React.useState([]);
  const RenderPrevUpdateProject = () => {
    const cathcItemToModified = allRecived.arrProjects.filter(
      (el) => el.id === renderPrevViewUpdate.idToModief
    );

    const [newBodyProject, setNewBodyProject] = React.useState({});

    React.useEffect(() => {
      for (const el of cathcItemToModified) {
        setNewBodyProject({
          nameProject: el.nameProject,
          tagsProject: el.tagsProject,
          description: el.description,
          urlProject: el.urlProject,
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeUpdateInputs = (event) => {
      setNewBodyProject((prevValues) => {
        const { name, value } = event.target;
        return {
          ...prevValues,
          [name]: value,
        };
      });
    };
    const changeInputImagePut = (e) => {
      let indexImg;
      if (imagesPreview.length > 0) {
        indexImg = imagesPreview[imagesPreview.length - 1].index + 1;
      } else {
        indexImg = 0;
      }
      let newImgsToState = readmultifiles(e, indexImg);
      let newImgsState = [...imagesPreview, ...newImgsToState];
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
      setimagesPreview(newImgsState);
    };
    function readmultifiles(e, indexInicial) {
      const files = e.currentTarget.files;
      setImagesFilesPut(files);
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
    function deleteImgPut(indice) {
      const newImgs = imagesPreview.filter(function (element) {
        return element.index !== indice;
      });
      setimagesPreview(newImgs);
    }
    for (const el of cathcItemToModified) {
      return (
        <form
          onSubmit={(event) =>
            allRecived.updateAproject(
              event,
              el.id,
              newBodyProject,
              imagesFilesPut
            )
          }
          className="renderPrevWindowUpdateProject"
        >
          <label>
            Change your images
            <span className="buttonSelectFiles">Select Files </span>
            <input hidden type="file" multiple onChange={changeInputImagePut} />
          </label>

          <div className="containerPreviewImages">
            {imagesPreview.map((imagen) => (
              <div className="containerAimage" key={imagen.index}>
                <button
                  className=""
                  onClick={deleteImgPut.bind("this", imagen.index)}
                >
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
            Change name of project
            <input
              name="nameProject"
              type="text"
              placeholder={el.nameProject}
              value={newBodyProject.nameProject}
              onChange={changeUpdateInputs}
              required={true}
            />
          </label>
          <label>
            Change tags <b>Remember that they are separated by commas. </b>
            <input
              name="tagsProject"
              type="text"
              placeholder={el.tagsProject}
              value={newBodyProject.tagsProject}
              onChange={changeUpdateInputs}
              required={true}
            />
          </label>
          <label>
            Change Your description
            <input
              name="description"
              type="text"
              placeholder={el.description}
              value={newBodyProject.description}
              onChange={changeUpdateInputs}
              required={true}
            />
          </label>
          <label>
            Change the url
            <input
              name="urlProject"
              type="tex"
              placeholder={el.urlProject}
              value={newBodyProject.urlProject}
              onChange={changeUpdateInputs}
              required={true}
            />
          </label>
          <input
            onClick={() =>
              setRenderPrevViewUpdate((prev) => ({
                render: !prev.render,
                idToModief: 0,
              }))
            }
            className="buttonCancelUpdate"
            type="button"
            value="cancel"
          />
          <button> Update Project</button>
        </form>
      );
    }
  };

  const renderPreView = allRecived.arrProjects.map((el) => {
    return (
      <div className="containerPrevProjectsToDel" key={el.id}>
        <h3>
          <b> Name project:</b> {el.nameProject}
        </h3>
        <p>
          <b>Description:</b> {el.description}
        </p>
        <span
          onClick={() =>
            setRenderPrevViewUpdate((prev) => ({
              render: !prev.render,
              idToModief: el.id,
            }))
          }
        >
          🔃
        </span>
        <span onClick={() => allRecived.deleteAproject(el.id)}> 🗑️</span>
      </div>
    );
  });

  return (
    <div className="containerElementsToUpdateOrDelete">
      <h2>Delete or modify your projects</h2>
      {renderPrevViewUpdate.render ? (
        <RenderPrevUpdateProject />
      ) : (
        renderPreView
      )}
    </div>
  );
}
