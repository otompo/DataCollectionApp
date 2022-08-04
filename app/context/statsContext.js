import React, { useState, createContext, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// create context
const StatsDataContext = createContext();

// context provider
const StatsDataProvider = ({ children }) => {
  const [formsStats, setStatsData] = useState(null);

  const loadFromAsyncStorage = useCallback(async () => {
    let data = await AsyncStorage.getItem("@Stats");

    if (data !== null) {
      const as = JSON.parse(data);
      setStatsData({ ...as, ...formsStats });
    }
  }, []);

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  return (
    <StatsDataContext.Provider value={[formsStats, setStatsData]}>
      {children}
    </StatsDataContext.Provider>
  );
};

export { StatsDataContext, StatsDataProvider };
