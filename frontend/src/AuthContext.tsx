import React, { createContext, useContext, useState, useEffect } from 'react';

type TokenType = string | null;

interface TokenContextType {
    token: TokenType;
    updateToken: (newToken: TokenType) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

// @ts-ignore
export const TokenProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<TokenType>(() => {
        const storedToken = localStorage.getItem('token');
        return storedToken;
    });

    const updateToken = (newToken: TokenType) => {
        if (typeof newToken === "string") {
            localStorage.setItem('token', newToken);
        }
        setToken(newToken);
    };

    return (
        <TokenContext.Provider value={{ token, updateToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
