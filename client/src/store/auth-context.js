import React from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    userId: ''
});

export default AuthContext;