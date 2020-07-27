import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface Company {
  name: string;
  user: string;
  zipcode: number;
  address: string;
  complement: string;
  neighborhood: string;
  uf: string;
  id: string;
}
interface AuthState {
  token: string;
  user: Company;
}

interface SigninCredentials {
  name: string;
  password: string;
}

interface AuthContextData {
  user: Company;
  signin(credentials: SigninCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signin = useCallback(async ({ name, password }) => {
    const response = await api.post('/sessions', {
      name,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
