import React from "react";
import PostNewProject from "./PostNewProject";
import UpdateOrDeleteProjects from "./UpdateOrDeleteProjects";

import {
  getAllProjectsToApi,
  deleteOnProjectFromApi,
  updateAprojectFromApi,
} from "../api/projectsApi";
import { logOutAdmin } from "../api/adminApi.js";
import { toast } from "react-toastify";
export default function AdminPanel({ session }) {
  const [allProjectsTo, setAllProjectsTo] = React.useState([]);

  React.useEffect(() => {
    getAllProjectsToApi()
      .then((res) => setAllProjectsTo(() => res))
      .catch((err) => err);
  }, []);

  const deleteAproject = (id) => {
    deleteOnProjectFromApi(id)
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
        if (res.msge === true) {
          window.location = "/admin_panel";
        }
      })
      .catch((err) => err);
  };
  const updateAproject = (event, idProject, newBody, filesPut) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nameProject", newBody.nameProject);
    formData.append("tagsProject", newBody.tagsProject);
    formData.append("description", newBody.description);
    formData.append("urlProject", newBody.urlProject);
    if (filesPut.length === 0 || filesPut.length === 1) {
      toast.warn("add one more image", {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
        theme: "dark",
      });
      return;
    }
    for (const file of filesPut) {
      formData.append("files", file);
    }
    updateAprojectFromApi(idProject, formData)
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
        if (res.modified === true) {
          window.location = "/admin_panel";
        }
      })
      .catch((err) => err);
  };
  const logOutSession = () => {
    logOutAdmin()
      .then((window.location = "/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={"containerAdminPanel"}>
      <div className="containerButtonLogOut">
        <button className="buttonLogOut" onClick={logOutSession}>
          log Out
        </button>
      </div>
      <PostNewProject />
      <UpdateOrDeleteProjects
        arrProjects={allProjectsTo}
        deleteAproject={deleteAproject}
        updateAproject={updateAproject}
      />
    </div>
  );
}
