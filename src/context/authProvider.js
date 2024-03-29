import { createContext, useState } from "react";
import { getRole } from "helpers/utils";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const roles = parseInt(getRole(token));
  const [auth, setAuth] = useState({ token, roles });
  console.log(auth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
