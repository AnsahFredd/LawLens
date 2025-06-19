import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

import { AuthContextType, User } from "../types/customTypes";

const AuthContext = createContext<AuthContextType | null>(null);
const API = import.meta.env.VITE_API_BASE_URL;

// Set up axios intercepter for auth token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // When the app loads, check if there is a token and user saved in localStorage from a previous login
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser && storedUser !== "undefined") {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.log("Failed to parse user data", error);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API}/auth/login`, {
        email,
        password,
      });
      const { token, user } = response.data.data;
      setUser(user);
      setToken(token);

      localStorage.setItem("token", token);

      // turning user from object to string (localstorage only saves strings)
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      console.log("Login error", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
      });

      const { token, user } = response.data.data;

      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Singup failed";
      console.log("Signup error", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
