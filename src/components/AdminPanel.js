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
import { appendProjectFieldsToFormData } from "../functions/projectFormData";
import { getAdminAccessCopy } from "../data/adminAccessCopy";
export default function AdminPanel({ session, language, isReadOnlyPreview }) {
  const [allProjectsTo, setAllProjectsTo] = React.useState([]);
  const copy = getAdminAccessCopy(language);

  React.useEffect(() => {
    getAllProjectsToApi()
      .then((res) => setAllProjectsTo(() => res))
      .catch((err) => err);
  }, []);

  const deleteAproject = (id) => {
    if (isReadOnlyPreview) {
      return;
    }
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
          window.location = "/devBriefCaseUi/admin_panel";
        }
      })
      .catch((err) => err);
  };
  const updateAproject = (event, idProject, newBody, filesPut) => {
    event.preventDefault();
    if (isReadOnlyPreview) {
      return;
    }
    const formData = new FormData();
    appendProjectFieldsToFormData(formData, newBody);
    if (filesPut.length === 1) {
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
          window.location = "/devBriefCaseUi/admin_panel";
        }
      })
      .catch((err) => err);
  };
  const logOutSession = () => {
    logOutAdmin()
      .then((window.location = "/devBriefCaseUi"))
      .catch((err) => console.log(err));
  };

  return (
    <div className={"containerAdminPanel"}>
      {isReadOnlyPreview ? (
        <div className="adminPreviewNotice">
          <h2>{copy.previewTitle}</h2>
          <p>{copy.previewDescription}</p>
        </div>
      ) : (
        <div className="containerButtonLogOut">
          <button className="buttonLogOut" onClick={logOutSession}>
            log Out
          </button>
        </div>
      )}
      <PostNewProject
        isReadOnlyPreview={isReadOnlyPreview}
        language={language}
      />
      <UpdateOrDeleteProjects
        arrProjects={allProjectsTo}
        deleteAproject={deleteAproject}
        updateAproject={updateAproject}
        isReadOnlyPreview={isReadOnlyPreview}
      />
    </div>
  );
}
