import React from "react";
import { postNewProjectToApi } from "../api/projectsApi";
import { toast } from "react-toastify";
import {
  appendProjectFieldsToFormData,
  initialProjectValues,
} from "../functions/projectFormData";
import { getProjectFormCopy } from "../data/projectFormCopy";

export default function PostNewProject({
  isReadOnlyPreview = false,
  language = "en",
}) {
  const [valuesProject, setValuesProject] =
    React.useState(initialProjectValues);
  const [images, setimages] = React.useState([]);
  const [imagesFiles, setImagesFiles] = React.useState([]);
  const text = getProjectFormCopy(language);

  const postProject = (event) => {
    event.preventDefault();
    if (isReadOnlyPreview) {
      return;
    }
    const formData = new FormData();
    appendProjectFieldsToFormData(formData, valuesProject);
    if (images.length === 0 || images.length === 1) {
      toast.warn(text.warnMoreImages, {
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
          toast.warn(text.warnSession, {
            position: "top-center",
            autoClose: 3000,
            pauseOnHover: false,
            theme: "dark",
          });
        }
        if (res.succes === true) {
          window.location = "/";
        }
      })
      .catch((err) => err);
  };

  const changesFormNewProject = (event) => {
    setValuesProject((prevValues) => {
      const { name, type, checked, value } = event.target;
      return {
        ...prevValues,
        [name]: type === "checkbox" ? checked : value,
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
      toast.warn(text.warnMaxImages, {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    } else if (newImgsState.length < 2) {
      toast.warn(text.warnMoreImages, {
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
        toast.warn(text.warnImageSize, {
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

  const renderInput = ({ id, name, label, placeholder, type = "text" }) => (
    <div className="projectFormField">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        value={valuesProject[name]}
        onChange={changesFormNewProject}
        placeholder={placeholder}
        required={name === "nameProject"}
      />
    </div>
  );

  const renderTextarea = ({ id, name, label, placeholder, size = "medium" }) => (
    <div className="projectFormField projectFormFieldFull">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        className={`textarea-${size}`}
        name={name}
        value={valuesProject[name]}
        onChange={changesFormNewProject}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <form onSubmit={postProject} className="containerFormPostNewProject">
      <h2>{text.title}</h2>
      <fieldset className="projectFormSection" disabled={isReadOnlyPreview}>
        <legend>{text.mainInfo}</legend>
        <div className="projectFormGrid">
          {renderInput({
            id: "post-name-project",
            name: "nameProject",
            label: text.nameProject,
            placeholder: text.nameProjectPlaceholder,
          })}
          {renderTextarea({
            id: "post-summary",
            name: "summary",
            label: text.summary,
            placeholder: text.summaryPlaceholder,
            size: "small",
          })}
          {renderTextarea({
            id: "post-description",
            name: "description",
            label: text.description,
            placeholder: text.descriptionPlaceholder,
          })}
          <div className="projectFormRow">
            <div className="projectFormField">
              <label htmlFor="post-project-type">{text.projectType}</label>
              <select
                id="post-project-type"
                name="projectType"
                value={valuesProject.projectType}
                onChange={changesFormNewProject}
              >
                <option value="">{text.selectProjectType}</option>
                <option value="personal">{text.personal}</option>
                <option value="client">{text.client}</option>
                <option value="professional">{text.professional}</option>
              </select>
            </div>
            {renderInput({
              id: "post-role",
              name: "role",
              label: text.role,
              placeholder: text.rolePlaceholder,
            })}
          </div>
        </div>
      </fieldset>

      <fieldset className="projectFormSection" disabled={isReadOnlyPreview}>
        <legend>{text.technicalCase}</legend>
        <div className="projectFormGrid">
          {renderTextarea({
            id: "post-problem",
            name: "problem",
            label: text.problem,
            placeholder: text.problemPlaceholder,
            size: "large",
          })}
          {renderTextarea({
            id: "post-responsibilities",
            name: "responsibilities",
            label: text.responsibilities,
            placeholder: text.responsibilitiesPlaceholder,
            size: "large",
          })}
          {renderTextarea({
            id: "post-technical-decisions",
            name: "technicalDecisions",
            label: text.technicalDecisions,
            placeholder: text.technicalDecisionsPlaceholder,
            size: "large",
          })}
          {renderTextarea({
            id: "post-architecture",
            name: "architecture",
            label: text.architecture,
            placeholder: text.architecturePlaceholder,
            size: "large",
          })}
          {renderTextarea({
            id: "post-results",
            name: "results",
            label: text.results,
            placeholder: text.resultsPlaceholder,
            size: "large",
          })}
        </div>
      </fieldset>

      <fieldset className="projectFormSection" disabled={isReadOnlyPreview}>
        <legend>{text.presentation}</legend>
        <div className="projectFormGrid">
          {renderInput({
            id: "post-url-project",
            name: "urlProject",
            label: text.urlProject,
            placeholder: text.urlProjectPlaceholder,
          })}
          {renderInput({
            id: "post-repository-url",
            name: "repositoryUrl",
            label: text.repositoryUrl,
            placeholder: text.repositoryUrlPlaceholder,
          })}
          <div className="projectFormRow projectFormRowCompact">
            <label className="checkboxLabel" htmlFor="post-featured">
              <input
                id="post-featured"
                type="checkbox"
                name="featured"
                checked={valuesProject.featured}
                onChange={changesFormNewProject}
              />
              <span>{text.featured}</span>
            </label>
            {renderInput({
              id: "post-display-order",
              name: "displayOrder",
              label: text.displayOrder,
              placeholder: text.displayOrderPlaceholder,
              type: "number",
            })}
          </div>
        </div>
      </fieldset>

      <fieldset className="projectFormSection" disabled={isReadOnlyPreview}>
        <legend>{text.content}</legend>
        <div className="projectFormGrid">
          <div className="projectFormField">
            <label htmlFor="post-tags-project">{text.tags}</label>
            <input
              id="post-tags-project"
              type="text"
              name="tagsProject"
              value={valuesProject.tagsProject}
              onChange={changesFormNewProject}
              placeholder={text.tagsPlaceholder}
            />
            <p className="projectFormHelp">{text.tagsHelp}</p>
          </div>
          <div className="projectFormField projectFormFieldFull">
            <span className="projectFormLabelText">{text.images}</span>
            <p className="projectFormHelp">{text.imagesHelp}</p>
            <label className="fileInputLabel" htmlFor="post-project-images">
              {text.selectFiles}
            </label>
            <input
              id="post-project-images"
              hidden
              type="file"
              multiple
              onChange={changeInputImage}
            />
          </div>
          <div className="containerPreviewImages">
            {images.map((imagen) => (
              <div className="containerAimage" key={imagen.index}>
                <button
                  type="button"
                  aria-label={text.removeImage}
                  onClick={deleteImg.bind("this", imagen.index)}
                >
                  x
                </button>
                <img
                  alt={text.previewAlt}
                  src={imagen.url}
                  data-toggle="modal"
                  data-target="#ModalPreViewImg"
                  className="img-responsive"
                ></img>
              </div>
            ))}
          </div>
        </div>
      </fieldset>
      <button
        className="buttoPostAndUpdateProject"
        disabled={isReadOnlyPreview}
      >
        {text.submit}
      </button>
    </form>
  );
}
