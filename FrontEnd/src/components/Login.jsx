import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useAuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwtToken"]);
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const { setIsLogged } = useAuthContext();

  const username = watch("username");
  const password = watch("password");

  // const handleEmailChange = (e) => {
  //   const username = e.target.value;
  //   setUsername(username);
  // };

  // const handlePasswordChange = async (e) => {
  //   const password = e.target.value;
  //   setPassword(password);
  // };

  const submitLogin = async (data) => {
    const response = await axios.post("http://localhost:8090/auth/login", {
      username: data.username,
      password: data.password,
    });

    console.log(response.data);
    if (response && response.data.accessToken) {
      setIsLogged(true);
      setCookie("jwtToken", response.data.accessToken, { path: "/" });
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <div className="flex flex-col items-center justify-center border-accent border p-10 rounded-xl">
        <h1 className="font-bold mb-5 text-lg">Login</h1>
        <form
          className="flex flex-col mb-5 w-full"
          onSubmit={handleSubmit(submitLogin)}
        >
          <label>username:</label>
          <input
            id="username"
            type="text"
            placeholder="enter your username"
            //onChange={handleEmailChange}
            className="my-2 border border-slate-500 p-2 rounded-lg"
            {...register("username", {
              required: "*This field is required",
              maxLength: {
                value: 20,
                message: "Username can't be longer than 20 characters",
              },
            })}
          />
          {errors.username && (
            <span className="text-sm text-red-500">
              {errors.username.message}
            </span>
          )}
          <label>password</label>
          <input
            id="password"
            type="password"
            placeholder="enter your password"
            //onChange={handlePasswordChange}
            className="my-2 border border-slate-500 p-2 rounded-lg"
            {...register("password", {
              required: "*This field is required",
              minLength: {
                value: 3,
                message: "Password must have at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Password can't be longer than 20 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
          <button className="m-2 bg-accent rounded-lg p-2" type="submit">
            log in
          </button>
        </form>
        <Link className="text-accent underline" to={"/register"}>
          create new account
        </Link>
      </div>
    </div>
  );
};

export default Login;
