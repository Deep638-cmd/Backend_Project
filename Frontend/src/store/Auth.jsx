import React, { useState, useContext, createContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);
const BACKEND_URL = "https://backend-project-2-lya3.onrender.com";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const localStorages = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    toast.success('Login successful!');
  };

  const isAuthenticated = !!token;

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email
        });
      } else {
        // Handle token expiration
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        toast.error('Session expired. Please log in again.');
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
      toast.error('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/service/get`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setService(data);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to fetch services');
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error('Failed to load services. Please try again later.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const value = {
    localStorages,
    logout,
    isAuthenticated,
    user,
    service,
    loading,
    refetchUser: fetchUser,
    refetchServices: fetchServices
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;