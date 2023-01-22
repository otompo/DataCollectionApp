import React, { useState, createContext, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const QuestionsDataContext = createContext();

// context provider
const QuestionsDataProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const loadFromAsyncStorage = useCallback(async () => {
    let data = await AsyncStorage.getItem("@questions");
    if (data !== null) {
      const as = JSON.parse(data);
      setQuestions([...questions, ...as]);
    }
  }, []);

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  return (
    <QuestionsDataContext.Provider value={[questions, setQuestions]}>
      {children}
    </QuestionsDataContext.Provider>
  );
};

export { QuestionsDataContext, QuestionsDataProvider };