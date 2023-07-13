async function getAllProjectsToApi() {
  try {
    const allDataProjects = await fetch(
      "http://localhost:8081/api/v1/getAllProjects"
    );
    if (!allDataProjects.ok) {
      throw new Error("err in Api ");
    }
    const dataOk = await allDataProjects.json();
    return dataOk;
  } catch (err) {
    throw err;
  }
}

async function postNewProjectToApi(body) {
  try {
    const postNewProject = await fetch(
      "http://localhost:8081/api/v1/postAnewProject",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const resToApi = await postNewProject.json();
    return resToApi;
  } catch (err) {
    throw err;
  }
}
async function updateAprojectFromApi(idProject, newBody) {
  try {
    const updateAproject = await fetch(
      `http://localhost:8081/api/v1/modifiedAProject/${idProject}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBody),
      }
    );
    const resUpdateProject = await updateAproject.json();
    return resUpdateProject;
  } catch (err) {
    throw err;
  }
}

async function deleteOnProjectFromApi(id) {
  try {
    const deleteElement = await fetch(
      `http://localhost:8081/api/v1/deleteAproject/${id}`,
      {
        method: "DELETE",
      }
    );
    //competadr
    const resDelete = await deleteElement.json();
    return resDelete;
  } catch (err) {
    throw err;
  }
}

export {
  getAllProjectsToApi,
  postNewProjectToApi,
  deleteOnProjectFromApi,
  updateAprojectFromApi,
};
