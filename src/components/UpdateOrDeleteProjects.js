import React from "react";

export default function UpdateOrDeleteProjects(allRecived) {
  const [renderPrevViewUpdate, setRenderPrevViewUpdate] = React.useState({
    render: false,
    idToModief: 0,
  });
  const RenderPrevUpdateProject = () => {
    const cathcItemToModified = allRecived.arrProjects.filter(
      (el) => el.id === renderPrevViewUpdate.idToModief
    );
    const [newBodyProject, setNewBodyProject] = React.useState({
      nameProject: "",
      tagsProject: "",
      description: "",
      imagesProject: "",
      urlProject: "",
    });
    const changeUpdateInputs = (event) => {
      setNewBodyProject((prevValues) => {
        const { name, value } = event.target;
        return {
          ...prevValues,
          [name]: value,
        };
      });
    };
    for (const el of cathcItemToModified) {
      return (
        <form
          onSubmit={(event) =>
            allRecived.updateAproject(event, el.id, newBodyProject)
          }
          className="renderPrevWindowUpdateProject"
        >
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
            Change your images
            <input type="file" />
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
      <h2>Elimina or modify uno de tus proyectos</h2>

      {renderPrevViewUpdate.render ? (
        <RenderPrevUpdateProject />
      ) : (
        renderPreView
      )}
    </div>
  );
}
