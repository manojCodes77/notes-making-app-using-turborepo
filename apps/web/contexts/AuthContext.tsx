'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthState, getAuthState, setAuthState, clearAuthState } from '../lib/auth';
import { authAPI } from '../lib/api';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthStateInternal] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const state = getAuthState();
    setAuthStateInternal(state);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.signin({ email, password });
      const newState = {
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      };
      setAuthState(response.user, response.token);
      setAuthStateInternal(newState);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await authAPI.signup({ name, email, password });
      const newState = {
        user: response.user,
        token: response.token,
        isAuthenticated: true,
      };
      setAuthState(response.user, response.token);
      setAuthStateInternal(newState);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    clearAuthState();
    setAuthStateInternal({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
