// LoginContext.js
import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export function LoginProvider({ children }) {
    const [isVeirfy, setIsVeirfy] = useState(false);

    return <LoginContext.Provider value={{ isVeirfy, setIsVeirfy }}>{children}</LoginContext.Provider>;
}

export function useCheckVerifyContext() {
    return useContext(LoginContext);
}
