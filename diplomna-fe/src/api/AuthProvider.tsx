import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

export interface RecipeProps {
  name: string;
  photoUrl: string;
  likes: number;
  time_for_cooking: number;
}

interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextValue {
  auth: {
    email: string;
    accessToken: string;
    user: User;
  };
  setAuth: Dispatch<SetStateAction<{
    email: string;
    accessToken: string;
    user: User;
  }>>;
}

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

interface AuthProviderProps {
  children: ReactNode;
}

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