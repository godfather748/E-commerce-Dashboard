import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate(`/${JSON.parse(auth)._id}`);
    }
  });

  const handleLogin = async () => {
    console.log(email, pass);

    let result = await fetch("http://localhost:5000/login", {
      method: "Post",
      body: JSON.stringify({ email, password: pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));

      navigate(`/${result.user._id}`);

      console.warn(result);
    } else {
      alert("No user found");
    }
  };
  return (
    <div style={{ marginLeft: "30%" }}>
      <h1>login page</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        class="inputBox"
        placeholder="Enter Email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
        class="inputBox"
        placeholder="Enter Password"
      />
      <button type="button" onClick={handleLogin} class="appButton">
        Login
      </button>
    </div>
  );
};

export default Login;
