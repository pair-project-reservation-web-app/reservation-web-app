import React from 'react'

const AuthContext = React.createContext({
    isLoggedIn: false,
    userId: '',
    userStatusHandler: () => { }
});

export default AuthContext;