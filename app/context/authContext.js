import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/baseUrl";

const AuthContext = createContext([{}, () => {}]);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    status: false,
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@auth");
      const as = JSON.parse(data);

      setAuthState({
        ...authState,
        ...as,
      });
    };
    loadFromAsyncStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("baseUrl")
      .then((data) => {
        axios.defaults.baseURL = data;
      })
      .catch((err) => {
        axios.defaults.baseURL = API;
      });
  }, []);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };