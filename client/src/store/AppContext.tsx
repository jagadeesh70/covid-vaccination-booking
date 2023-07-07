import React, { createContext, useState } from 'react';

interface AppContextData {
  accessToken: string;
  updateAccessToken: (accessToken: string) => void;
  resetAccessToken: () => void;
}

const AppContext = createContext<AppContextData>({
    accessToken: '',
    updateAccessToken: () => {},
    resetAccessToken: () => {}
});

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  const updateAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  const resetAccessToken = () => {
    setAccessToken("");
  };

  const contextValue: AppContextData = {
    accessToken,
    updateAccessToken,
    resetAccessToken
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContext;
