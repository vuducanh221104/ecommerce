// LoginProvider.js
import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isAuth, setAuth] = useState(false);

    return <LoginContext.Provider value={{ isAuth, setAuth }}>{children}</LoginContext.Provider>;
}

export function useLoginContext() {
    return useContext(LoginContext);
}
