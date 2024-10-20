import React from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthContext } from "../context/authContext";

const Authenticator = () => {
  const navigate = useNavigate();

  const { isLogged } = useAuthContext();

  useEffect(() => {
    if (!isLogged) {
      {
        navigate("/register");
      }
      console.log(isLogged);
    }
  }, [isLogged]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Authenticator;
