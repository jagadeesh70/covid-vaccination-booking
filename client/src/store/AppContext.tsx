import axios from 'axios';
import React, { createContext, useState } from 'react';

interface AppContextData {
  accessToken: string;
  user:any;
  updateAccessToken: (accessToken: string) => void;
  resetAccessToken: () => void;
}

const AppContext = createContext<AppContextData>({
    accessToken: '',
    user:'',
    updateAccessToken: () => {},
    resetAccessToken: () => {}
});

interface AppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState('');


  const updateAccessToken = async(accessToken: string) => {
    setAccessToken(accessToken);
    let userData = await axios.get('http://localhost:3000/users/getme',{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    })
    setUser(userData.data);
  };

  const resetAccessToken = () => {
    setAccessToken("");
    setUser('')
  };

  const contextValue: AppContextData = {
    accessToken,
    user,
    updateAccessToken,
    resetAccessToken
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppContext;
