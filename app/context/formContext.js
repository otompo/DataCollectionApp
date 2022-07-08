import React, { useState, createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const FormDataContext = createContext();

// context provider
const FormDataProvider = ({ children }) => {
  const [formsData, setFormsData] = useState([{}, function () {}]);

  useEffect(() => {
    const loadFromAsyncStorage = async () => {
      let data = await AsyncStorage.getItem("formdata");
      const as = JSON.parse(data);
      console.log(as);
      // setFormsData({
      //   ...mills,
      //   food: as.food,
      // });
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
