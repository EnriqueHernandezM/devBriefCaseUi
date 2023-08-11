import React from "react";
export default function FormLoginAdmin({
  changesOnFormLogin,
  adminForm,
  submitFormLogin,
  setRenderFormLogin,
}) {
  return (
    <div className="formLoginAdmin">
      <h4>Credentials</h4>
      <span onClick={() => setRenderFormLogin((prev) => !prev)}> ❌</span>
      <form
        onSubmit={(event) => {
          submitFormLogin(event);
          setRenderFormLogin((prev) => !prev);
        }}
      >
        <label>
          <input
            onChange={changesOnFormLogin}
            type="text"
            name="name"
            value={adminForm.name}
            placeholder="name"
          />
        </label>
        <label>
          <input
            onChange={changesOnFormLogin}
            type="password"
            name="password"
            value={adminForm.password}
            placeholder="password"
          />
        </label>

        <button>Log In</button>
      </form>
    </div>
  );
}
