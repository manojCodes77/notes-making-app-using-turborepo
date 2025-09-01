export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const getAuthState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { user: null, token: null, isAuthenticated: false };
  }

  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    console.log('Retrieved token:', token ? 'exists' : 'missing');
    console.log('Retrieved user:', userStr ? 'exists' : 'missing');
    
    if (!token || !userStr) {
      return { user: null, token: null, isAuthenticated: false };
    }

    const user = JSON.parse(userStr);
    return { user, token, isAuthenticated: true };
  } catch (error) {
    console.error('Error getting auth state:', error);
    return { user: null, token: null, isAuthenticated: false };
  }
};

export const setAuthState = (user: User, token: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Auth state saved successfully');
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const clearAuthState = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
