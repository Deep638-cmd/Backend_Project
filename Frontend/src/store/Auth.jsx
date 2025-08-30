import React, { useState, useContext, createContext, useEffect } from 'react';

// This is the AuthContext and AuthProvider component from your Auth.jsx file,
// adapted to work within this single-file environment.
const AuthContext = createContext(null);
const BACKEND_URL = "https://backend-project-1-wxg2.onrender.com";

const AuthProvider = ({ children }) => {
  // We use a state variable instead of localStorage, which is not available in this environment.
  const [token, setToken] = useState(null);
  const [user, setuser] = useState(null);
  const [service, setservice] = useState(null);

  const localStorages = (newToken) => {
    setToken(newToken);
   // showMessage('Success', 'Login successful!');
  };

  const isAuthenticated = !!token;

  const fetchUser = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${BACKEND_URL}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        setuser({
          name: data.name,
          email: data.email
        });
      } else {
        // Handle token expiration or invalid token
        setToken(null);
        setuser(null);
      //  showMessage('Error', 'Session expired. Please log in again.');
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setToken(null);
      setuser(null);
    //  showMessage('Error', 'Failed to fetch user data. Please check your connection.');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/service/get`, {
        method: "GET"
      });

      if (response.ok) {
        const data = await response.json();
        setservice(data);
      } else {
        //showMessage('Error', 'Failed to fetch services.');
      }
    } catch (err) {
      console.error("Error fetching services:", err);
    //  showMessage('Error', 'An error occurred while fetching services.');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setuser(null);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setuser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        localStorages, 
        logout, 
        isAuthenticated, 
        user, 
        service 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
