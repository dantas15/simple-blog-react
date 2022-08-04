import { createContext, ReactNode } from 'react';

import { LoginRequest, useAuth } from '../hooks/useAuth';

interface UseAuthReturnType {
  authenticated: boolean;
  loading: boolean;
  handleLogin: ({ email, password }: LoginRequest) => Promise<void>;
  handleLogout: () => void;
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  userIsAdmin: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as UseAuthReturnType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const authData = useAuth();

  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
}
