import { useState, useEffect, createContext, useContext } from "react";
import { apiClient } from "@/lib/api";

interface User {
  id: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if there's a stored user and token
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('auth_token');
      
      if (storedUser && token) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAdmin(userData.role === 'admin' || userData.role === 'super_admin');
        
        // Verify the token is still valid
        const { user: verifiedUser, error } = await apiClient.getMe();
        if (error) {
          // Token is invalid, clear auth state
          await signOut();
        } else if (verifiedUser) {
          setUser(verifiedUser);
          setIsAdmin(verifiedUser.role === 'admin' || verifiedUser.role === 'super_admin');
          localStorage.setItem('user', JSON.stringify(verifiedUser));
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      await signOut();
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { user: userData, error } = await apiClient.signIn(email, password);
      
      if (error) {
        return { error };
      }
      
      setUser(userData);
      setIsAdmin(userData.role === 'admin' || userData.role === 'super_admin');
      
      return { error: null };
    } catch (error) {
      return { error: { message: 'Failed to sign in' } };
    }
  };

  const signUp = async (email: string, password: string) => {
    return await apiClient.signUp(email, password);
  };

  const signOut = async () => {
    await apiClient.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      loading,
      signIn,
      signUp,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}