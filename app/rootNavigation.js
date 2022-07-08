import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import authStorage from "./context/storage";
// import AppLoading from "expo-app-loading";
import { AuthContext, AuthProvider } from "./context/authContext";
import AppNavigator from "./components/navigation/AppNavigator";
import { StatusBar } from "react-native";
import colors from "./config/colors";

export default function RootNavigation() {
  // const [state, setState] = useContext(AuthContext);
  // const authenticated = state && state.token !== "" && state.user !== null;
  // const [isReady, setIsReady] = useState(false);
  // useEffect(() => {
  //   restoreUser();
  // }, []);

  // const restoreUser = async () => {
  //   const user = await authStorage.getUser();
  //   // if (user) setUser(user);
  // };

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
