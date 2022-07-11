import React, { useState, createContext, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const FormDataContext = createContext();

// context provider
const FormDataProvider = ({ children }) => {
  const [formsData, setFormsData] = useState(null);

  const loadFromAsyncStorage = useCallback( async () => {
    let data = await AsyncStorage.getItem("@formdata");
    if (data !== null) {
      const as = JSON.parse(data);
      console.log("FORM",as);
      setFormsData({ 
        ...formsData,
        ...as
      });
    }
   // setFormsData({ ...formsData });
  },[]);

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  return (
    <FormDataContext.Provider value={[formsData, setFormsData]}>
      {children}
    </FormDataContext.Provider>
  );
};

export { FormDataContext, FormDataProvider };
