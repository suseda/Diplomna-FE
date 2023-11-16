import { ReactNode, createContext, useState } from 'react';

interface AuthContextValue {
  auth: 
  {
    email: string, 
    password: string, 
    accessToken : string
  }; 
  setAuth: (auth: {email: string, password: string, accessToken : string}) => void; 
}

export const AuthContext = createContext<AuthContextValue>({ auth: { email: '', password: '', accessToken: '' }, setAuth: () => {} });

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({
    email: '',
    password: '',
    accessToken: ''});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;