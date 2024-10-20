import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = (props) => {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="mainContainer">
      <div className={"titleContainer"}>
        <div>Welcome!</div>
      </div>
      <div>This is the home page.</div>
      <div className={"buttonContainer"}>
        <input
          className={"inputButton"}
          type="button"
          onClick={onButtonClick}
          value="Dashboard"
        />
      </div>
    </div>
  );
};

export default LandingPage;
