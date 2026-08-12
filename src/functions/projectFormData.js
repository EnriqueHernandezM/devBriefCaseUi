const projectFields = [
  "nameProject",
  "summary",
  "description",
  "projectType",
  "role",
  "problem",
  "responsibilities",
  "technicalDecisions",
  "architecture",
  "results",
  "urlProject",
  "repositoryUrl",
  "featured",
  "displayOrder",
  "tagsProject",
];

const initialProjectValues = {
  nameProject: "",
  summary: "",
  description: "",
  projectType: "",
  role: "",
  problem: "",
  responsibilities: "",
  technicalDecisions: "",
  architecture: "",
  results: "",
  urlProject: "",
  repositoryUrl: "",
  featured: false,
  displayOrder: "",
  tagsProject: "",
};

function tagsToInputValue(tagsProject) {
  if (Array.isArray(tagsProject)) {
    return tagsProject.join(", ");
  }
  return tagsProject || "";
}

function normalizeProjectValues(project = {}) {
  return {
    ...initialProjectValues,
    ...project,
    tagsProject: tagsToInputValue(project.tagsProject),
    featured: project.featured === true || project.featured === 1 || project.featured === "true",
    displayOrder:
      project.displayOrder === null || project.displayOrder === undefined
        ? ""
        : project.displayOrder,
  };
}

function appendProjectFieldsToFormData(formData, valuesProject) {
  projectFields.forEach((field) => {
    const value = valuesProject[field];

    if (field === "featured") {
      formData.append(field, value ? "true" : "false");
      return;
    }

    formData.append(field, value === null || value === undefined ? "" : value);
  });
}

export {
  initialProjectValues,
  normalizeProjectValues,
  appendProjectFieldsToFormData,
};
