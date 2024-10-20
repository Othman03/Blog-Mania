import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [cookies, setCookie] = useCookies(["jwtToken"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLogged } = useAuthContext();

  const handleEmailChange = (e) => {
    const NewUsername = e.target.value;
    setUsername(NewUsername);
  };

  const handlePasswordChange = async (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:8090/auth/register", {
      username: username,
      password: password,
    });

    console.log(response.data);
    if (response && response.data.accessToken) {
      setIsLogged(true);
      setCookie("jwtToken", response.data.accessToken, { path: "/" });
    }
  };
  return (
    <div className="flex items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center border-accent border p-10 rounded-xl">
        <h1 className="font-bold mb-5 text-lg">Register</h1>
        <div>
          <form className="flex flex-col mb-5 w-full" onSubmit={submitLogin}>
            <label>username:</label>
            <input
              id="Newusername"
              type="text"
              placeholder="enter your username"
              onChange={handleEmailChange}
              value={username}
              className="my-2 border border-slate-500 p-2 rounded-lg"
            />
            <label>password</label>
            <input
              id="Newpassword"
              type="password"
              placeholder="enter your password"
              onChange={handlePasswordChange}
              className="my-2 border border-slate-500 p-2 rounded-lg"
              value={password}
            />
            <button className="m-2 bg-accent rounded-lg p-2" type="submit">
              register
            </button>
          </form>
          <Link className="text-accent underline" to={"/login"}>
            already have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
