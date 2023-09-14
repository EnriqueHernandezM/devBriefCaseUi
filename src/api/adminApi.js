async function getLoginAdmin() {
  try {
    const getAdmin = await fetch(
      "https://briefcase.fly.dev/api_briefcase/v1/login",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (getAdmin.status === 401) {
      return { session: false };
    }
    if (!getAdmin.ok) {
      throw new Error("err in Api Admin");
    }
    const dataAdminOk = await getAdmin.json();
    return dataAdminOk;
  } catch (err) {
    throw err;
  }
}

async function loginAdmin(dataAdmin) {
  try {
    const loginAdmin = await fetch(
      "https://briefcase.fly.dev/api_briefcase/v1/login",

      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataAdmin),
      }
    );
    const resToAdmin = await loginAdmin.json();
    return resToAdmin;
  } catch (err) {
    throw err;
  }
}
async function logOutAdmin() {
  try {
    const closeSession = await fetch(
      "https://briefcase.fly.dev/api_briefcase/v1/logOut",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!closeSession.ok) {
      throw new Error("err in Api Admin");
    }
  } catch (err) {
    throw err;
  }
}

export { getLoginAdmin, loginAdmin, logOutAdmin };
