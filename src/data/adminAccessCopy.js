const adminAccessCopy = {
  en: {
    title: "Admin panel",
    description:
      "This portfolio is more than a showcase. It includes its own content management panel.",
    supportingText:
      "Explore it in read-only mode, or sign in if you have admin access.",
    explore: "Explore panel",
    signIn: "Admin sign in",
    loginTitle: "Admin sign in",
    close: "Close admin access dialog",
    previewTitle: "Read-only preview",
    previewDescription:
      "You can explore the admin panel. Editing actions are disabled.",
  },
  es: {
    title: "Panel de administracion",
    description:
      "Este portafolio es mas que una muestra de proyectos. Incluye su propio panel para administrar el contenido.",
    supportingText:
      "Puedes explorarlo en modo de solo lectura o iniciar sesion si tienes acceso de administrador.",
    explore: "Explorar panel",
    signIn: "Iniciar sesion",
    loginTitle: "Iniciar sesion",
    close: "Cerrar dialogo de acceso al panel",
    previewTitle: "Vista de solo lectura",
    previewDescription:
      "Puedes explorar el panel de administracion. Las acciones de edicion estan deshabilitadas.",
  },
};

function getAdminAccessCopy(language) {
  return adminAccessCopy[language] ?? adminAccessCopy.en;
}

export { adminAccessCopy, getAdminAccessCopy };
