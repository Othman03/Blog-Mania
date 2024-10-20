import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(true);

  /* useEffect(() => {
    async function getTokenFromCookie() {}
    getTokenFromCookie();
  }, []); */

  return (
    <StateContext.Provider
      value={{
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAuthContext = () => useContext(StateContext);
