import {createContext, useState} from 'react';
import { AuthContextValue,AuthProviderProps } from '../interface';


export const AuthContext = createContext<AuthContextValue>({
  auth: {
    email: '',
    accessToken: '',
    user: {
      id: 0,
      name: '',
      email: ''
    },
  },
  setAuth: () => {},
});


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({
    email: '',
    accessToken: '',
    user: {
      id: 0,
      name: '',
      email: ''
    },
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;