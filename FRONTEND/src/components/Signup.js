import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate(`/${JSON.parse(auth)._id}`);
    }
  });

  const collectData = async () => {
    console.log(name, email, pass);

    let result = await fetch(`http://localhost:5000/signup`, {
      method: "Post",
      body: JSON.stringify({ name, email, password: pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();

    localStorage.setItem("user", JSON.stringify(result.user));
    localStorage.setItem("token", JSON.stringify(result.auth));

    navigate(`/${result.user._id}`);

    console.warn(result);
  };

  return (
    <div style={{ marginLeft: "30%" }}>
      <h1>Register</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
        class="inputBox"
      ></input>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
        class="inputBox"
      ></input>
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Enter Password"
        class="inputBox"
      ></input>
      <button onClick={collectData} type="button" class="appButton">
        Signup
      </button>
    </div>
  );
};

export default Signup;
