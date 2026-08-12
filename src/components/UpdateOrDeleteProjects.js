import React from "react";
import { toast } from "react-toastify";
import { normalizeProjectValues } from "../functions/projectFormData";

export default function UpdateOrDeleteProjects(allRecived) {
  const [renderPrevViewUpdate, setRenderPrevViewUpdate] = React.useState({
    render: false,
    idToModief: 0,
  });
  const [imagesPreview, setimagesPreview] = React.useState([]);
  const [imagesFilesPut, setImagesFilesPut] = React.useState([]);

  const RenderPrevUpdateProject = () => {
    const cathcItemToModified = allRecived.arrProjects.filter((el) => el.id === renderPrevViewUpdate.idToModief);

    const [newBodyProject, setNewBodyProject] = React.useState(normalizeProjectValues());

    React.useEffect(() => {
      for (const el of cathcItemToModified) {
        setNewBodyProject(normalizeProjectValues(el));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeUpdateInputs = (event) => {
      setNewBodyProject((prevValues) => {
        const { name, type, checked, value } = event.target;
        return {
          ...prevValues,
          [name]: type === "checkbox" ? checked : value,
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
      } else if (newImgsState.length === 1) {
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
    function deleteImgPut(indice) {
      const newImgs = imagesPreview.filter(function (element) {
        return element.index !== indice;
      });
      setimagesPreview(newImgs);
    }
    for (const el of cathcItemToModified) {
      const currentImages = Array.isArray(el.imagesProject) ? el.imagesProject : [];
      return (
        <form onSubmit={(event) => allRecived.updateAproject(event, el.id, newBodyProject, imagesFilesPut)} className="renderPrevWindowUpdateProject">
          <fieldset className="projectFormSection" disabled={allRecived.isReadOnlyPreview}>
            <legend>Informacion principal</legend>
            <label>
              Change name of project
              <input name="nameProject" type="text" placeholder={el.nameProject || ""} value={newBodyProject.nameProject} onChange={changeUpdateInputs} required={true} />
            </label>
            <label>
              Summary
              <textarea name="summary" placeholder={el.summary || ""} value={newBodyProject.summary} onChange={changeUpdateInputs} />
            </label>
            <label>
              Description
              <textarea name="description" placeholder={el.description || ""} value={newBodyProject.description} onChange={changeUpdateInputs} />
            </label>
            <label>
              Project type
              <select name="projectType" value={newBodyProject.projectType} onChange={changeUpdateInputs}>
                <option value="">Select a type</option>
                <option value="personal">personal</option>
                <option value="client">client</option>
                <option value="professional">professional</option>
              </select>
            </label>
            <label>
              Role
              <input name="role" type="text" placeholder={el.role || ""} value={newBodyProject.role} onChange={changeUpdateInputs} />
            </label>
          </fieldset>

          <fieldset className="projectFormSection" disabled={allRecived.isReadOnlyPreview}>
            <legend>Caso tecnico</legend>
            <label>
              Problem
              <textarea name="problem" placeholder={el.problem || ""} value={newBodyProject.problem} onChange={changeUpdateInputs} />
            </label>
            <label>
              Responsibilities
              <textarea name="responsibilities" placeholder={el.responsibilities || ""} value={newBodyProject.responsibilities} onChange={changeUpdateInputs} />
            </label>
            <label>
              Technical decisions
              <textarea name="technicalDecisions" placeholder={el.technicalDecisions || ""} value={newBodyProject.technicalDecisions} onChange={changeUpdateInputs} />
            </label>
            <label>
              Architecture
              <textarea name="architecture" placeholder={el.architecture || ""} value={newBodyProject.architecture} onChange={changeUpdateInputs} />
            </label>
            <label>
              Results
              <textarea name="results" placeholder={el.results || ""} value={newBodyProject.results} onChange={changeUpdateInputs} />
            </label>
          </fieldset>

          <fieldset className="projectFormSection" disabled={allRecived.isReadOnlyPreview}>
            <legend>Presentacion y enlaces</legend>
            <label>
              Change the url
              <input name="urlProject" type="text" placeholder={el.urlProject || ""} value={newBodyProject.urlProject} onChange={changeUpdateInputs} />
            </label>
            <label>
              Repository URL
              <input name="repositoryUrl" type="text" placeholder={el.repositoryUrl || ""} value={newBodyProject.repositoryUrl} onChange={changeUpdateInputs} />
            </label>
            <label className="checkboxLabel">
              Featured
              <input name="featured" type="checkbox" checked={newBodyProject.featured} onChange={changeUpdateInputs} />
            </label>
            <label>
              Display order
              <input name="displayOrder" type="number" placeholder="Optional" value={newBodyProject.displayOrder} onChange={changeUpdateInputs} />
            </label>
          </fieldset>

          <fieldset className="projectFormSection" disabled={allRecived.isReadOnlyPreview}>
            <legend>Contenido actual</legend>
            <label>
              Change tags <b>Remember that they are separated by commas. </b>
              <input name="tagsProject" type="text" placeholder={newBodyProject.tagsProject} value={newBodyProject.tagsProject} onChange={changeUpdateInputs} />
            </label>
            <div className="containerPreviewImages">
              {currentImages.map((image) => (
                <div className="containerAimage" key={image}>
                  <img alt={el.nameProject || "project"} src={image} className="img-responsive"></img>
                </div>
              ))}
            </div>
            <label>
              Change your images up to 2mb
              <span className="buttonSelectFiles">Select Files </span>
              <input hidden type="file" multiple onChange={changeInputImagePut} />
            </label>

            <div className="containerPreviewImages">
              {imagesPreview.map((imagen) => (
                <div className="containerAimage" key={imagen.index}>
                  <button type="button" className="" onClick={deleteImgPut.bind("this", imagen.index)}>
                    x
                  </button>
                  <img alt="your img" src={imagen.url} data-toggle="modal" data-target="#ModalPreViewImg" className="img-responsive"></img>
                </div>
              ))}
            </div>
          </fieldset>

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
          <button disabled={allRecived.isReadOnlyPreview}> Update Project</button>
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
          <b>Summary:</b> {el.summary || el.description || ""}
        </p>
        <button
          type="button"
          className="projectAdminListAction"
          disabled={allRecived.isReadOnlyPreview}
          onClick={() => {
            if (allRecived.isReadOnlyPreview) {
              return;
            }
            setRenderPrevViewUpdate((prev) => ({
              render: !prev.render,
              idToModief: el.id,
            }));
          }}
        >
          update
        </button>
        <button type="button" className="projectAdminListAction" disabled={allRecived.isReadOnlyPreview} onClick={() => allRecived.deleteAproject(el.id)}>
          delete
        </button>
      </div>
    );
  });

  return (
    <div className="containerElementsToUpdateOrDelete">
      <h2> Manage your projects </h2>
      {renderPrevViewUpdate.render ? <RenderPrevUpdateProject /> : renderPreView}
    </div>
  );
}
