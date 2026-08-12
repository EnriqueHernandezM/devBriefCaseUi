import React from "react";

export default function FormLoginAdmin({
  changesOnFormLogin,
  adminForm,
  submitFormLogin,
  setRenderFormLogin,
  copy,
}) {
  return (
    <div className="formLoginAdmin">
      <h4>{copy.loginTitle}</h4>
      <button
        type="button"
        className="closeLoginAdmin"
        onClick={() => setRenderFormLogin((prev) => !prev)}
        aria-label={copy.close}
      >
        x
      </button>
      <form onSubmit={submitFormLogin}>
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

        <button>{copy.signIn}</button>
      </form>
    </div>
  );
}
