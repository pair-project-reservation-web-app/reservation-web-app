import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  userId: "",
  userStatusHandler: () => {},
  setModalHandler: () => {},
});

export default AuthContext;
