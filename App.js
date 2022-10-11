import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import AppNavigator from "./app/components/navigation/AppNavigator";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox, StatusBar } from "react-native";
import colors from "./app/config/colors";
import { AuthProvider } from "./app/context/authContext";
import { FormDataProvider } from "./app/context/formContext";
import {StatsDataProvider} from './app/context/statsContext'

LogBox.ignoreAllLogs(true);
export default () => (
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
