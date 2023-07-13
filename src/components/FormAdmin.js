import React from "react";
export default function FormAdmin() {
  const catchFormAdmin = (event) => {
    event.preventDefault();
    const largePassword = valuesFormAdmin.password.length;
    const largeEmailUser = valuesFormAdmin.emailUser;
    // eslint-disable-next-line no-useless-escape
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      (largePassword > 5) &
      (largePassword < 7) &
      !/[$&<>%!?{}]/.test(largeEmailUser) &
      regexEmail.test(largeEmailUser)
    ) {
      console.log("pasa para mandar a postman");
    }
  };
  const [valuesFormAdmin, setValuesFormAdmin] = React.useState({
    emailUser: "",
    password: "",
  });
  const changesFun = (event) => {
    setValuesFormAdmin((prevValues) => {
      const { name, value } = event.target;
      return { ...prevValues, [name]: value };
    });
  };
  return (
    <form onSubmit={catchFormAdmin}>
      <input
        name="emailUser"
        type="email"
        placeholder="your email"
        value={valuesFormAdmin.emailUser}
        onChange={changesFun}
      />
      <input
        name="password"
        type="password"
        placeholder="you password"
        value={valuesFormAdmin.password}
        onChange={changesFun}
      />
      <button>LogIn</button>
    </form>
  );
}
