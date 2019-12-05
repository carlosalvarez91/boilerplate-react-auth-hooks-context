import React, { createContext,  useReducer, useEffect } from "react";

let reducer = (token, newToken) => {
  if (newToken === null || newToken === undefined) {
    localStorage.removeItem("token");
    return initialState;
  }
  return newToken
};

const initialState = null


const localState = JSON.parse(localStorage.getItem("token"));

const AuthContext = createContext();

 
function AuthProvider(props) {
  const [token, setToken] = useReducer(reducer, localState || initialState);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
