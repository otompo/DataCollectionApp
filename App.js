import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AppNavigator from "./app/components/navigation/AppNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, StatusBar, ActivityIndicator } from "react-native";
import { AuthProvider } from "./app/context/authContext";
import { FormDataProvider } from "./app/context/formContext";
import { StatsDataProvider } from "./app/context/statsContext";
import colors from "./app/config/colors";
import * as SplashScreen from "expo-splash-screen";

LogBox.ignoreAllLogs(true);

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (isLoadingComplete) {
    <ActivityIndicator size="large" color={colors.primary} />;
  }
  return (
    <AuthProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
        <FormDataProvider>
          <StatsDataProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </StatsDataProvider>
        </FormDataProvider>
      </ApplicationProvider>
    </AuthProvider>
  );
}
