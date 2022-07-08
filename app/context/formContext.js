import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const FormDataContext = createContext();

// context provider
const FormDataProvider = ({ children }) => {
  const [formsData, setFormsData] = useState({
    formdata: "",
  });

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("@formdata");
      if (data !== null) {
        const as = JSON.parse(data);
        console.log(as);
      }
      setFormsData({ ...formsData });
    };
    loadFromAsyncStorage();
  }, []);

  return (
    <FormDataContext.Provider value={[formsData, setFormsData]}>
      {children}
    </FormDataContext.Provider>
  );
};

export { FormDataContext, FormDataProvider };
