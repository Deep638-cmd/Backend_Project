import { createContext, useContext, useEffect, useState } from "react";
const BACKEND_URL = "https://my-own-project-backend.onrender.com";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("Token"));
  const [user, setuser] = useState();
  const [service, setservice] = useState();

  const localStorages = (token) => {
    setToken(token);
    return localStorage.setItem("Token", token);
  };

  const isAuthenticated = !!token;
console.log(" isAuthenticated ", isAuthenticated )
  const ayan = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("AYAN", data);
        setuser({
          name: data.name,
          email: data.email
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deep = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/service/get`, {
        method: "GET"
       
      });

      if (response.ok) {
        const data = await response.json();
        console.log("AYAN", data);
        setservice(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Move useEffect outside of deep function
  useEffect(() => {
    deep();
  }, []);

  useEffect(() => {
    if (token) {
      ayan();
    } else {
      setuser(null);
    }
  }, [token]);

  const logout = () => {
    setToken("");
    return localStorage.removeItem("Token");
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