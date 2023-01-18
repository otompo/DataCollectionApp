import React, { useState, useEffect, createContext, useCallback } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../config/baseUrl";

const AuthContext = createContext([{}, function () {}]);

const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    status: false,
  });

  // config axios
  // const status = state && state.status ? state.status : "";
  //   configure axios
  AsyncStorage.getItem("baseUrl").then(data=>{
    axios.defaults.baseURL = data;
  }).catch(err=>{
    //console.log("error reading URL")
    //pass default
    axios.defaults.baseURL = API;
  })
  
  // axios.defaults.headers.common["Authorization"] = `Bearer ${status}`;

  const loadFromAsyncStorage = useCallback(async () => {
    let data = await AsyncStorage.getItem("@auth");
    const as = JSON.parse(data);

    setState({
      ...state,
      ...as,
    });
  }, []);

  useEffect(() => {
    loadFromAsyncStorage();
  });
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
