import React from "react";
import PostNewProject from "./PostNewProject";
import UpdateOrDeleteProjects from "./UpdateOrDeleteProjects";

import {
  getAllProjectsToApi,
  deleteOnProjectFromApi,
  updateAprojectFromApi,
} from "../api/projectsApi";
export default function AdminPanel() {
  const [allProjectsTo, setAllProjectsTo] = React.useState([]);

  React.useEffect(() => {
    getAllProjectsToApi()
      .then((res) => setAllProjectsTo(() => res))
      .catch((err) => err);
  }, []);

  const deleteAproject = (id) => {
    deleteOnProjectFromApi(id)
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  const updateAproject = (event, idProject, newBody) => {
    event.preventDefault();
    let tagsProject = newBody.tagsProject.split(",");
    const valuesToEnv = { ...newBody, tagsProject };
    updateAprojectFromApi(idProject, valuesToEnv)
      .then((res) => console.log(res))
      .catch((err) => err);
  };
  return (
    <div className={"containerAdminPanel"}>
      <PostNewProject />
      <UpdateOrDeleteProjects
        arrProjects={allProjectsTo}
        deleteAproject={deleteAproject}
        updateAproject={updateAproject}
      />
    </div>
  );
}
