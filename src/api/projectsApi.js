async function getAllProjectsToApi() {
  try {
    const allDataProjects = await fetch(
      "https://briefcase.fly.dev/api_briefcase/v1/getAllProjects"
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
      "https://briefcase.fly.dev/api_briefcase/v1/postAnewProject",
      {
        method: "POST",
        credentials: "include",
        body: body,
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
      `https://briefcase.fly.dev/api_briefcase/v1/modifiedAProject/${idProject}`,
      {
        method: "PUT",
        credentials: "include",

        body: newBody,
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
      `https://briefcase.fly.dev/api_briefcase/v1/deleteAproject/${id}`,
      {
        method: "DELETE",
        credentials: "include",
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
