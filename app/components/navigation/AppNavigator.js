import React, { useContext } from "react";
import { DrawerActions } from "@react-navigation/native";
import { HomeDrawerNavigator } from "./HomeDrawerNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Signin } from "../../screens/Signin";
import { Signup } from "../../screens/Signup";
import HeaderTabs from "./HeaderTabs";
import HeaderTopLeft from "./HeaderTopLeft";
import colors from "../../config/colors";
// import { AuthContext } from "../../context/authContext";
import FormDetailsScreen from "../../screens/FormDetailsScreen";
import ForgotPassword from "../../screens/ForgotPassword";
import SettingsScreen from "../../screens/SettingsScreen";
import ResponseStats from '../../screens/ResponseStats'
import Response from '../../screens/Response'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontWeight: "500",
          },
        }}
      >
        <Stack.Screen
          name={"Drawer"}
          component={HomeDrawerNavigator}
          options={({ navigation }) => ({
            title: "Home",
            headerLeft: () => (
              <HeaderTabs
                icon="bars"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
            headerRight: () => <HeaderTabs icon="refresh" />,
          })}
        />
         <Stack.Screen
          name="ResponseStats"
          component={ResponseStats}
          options={{
            title: "Responses",
          }}
        />

        <Stack.Screen
          name="Response"
          component={Response}
          options={{
            title: "Responses",
          }}
        />

        <Stack.Screen
          name="FormDetailsScreen"
          component={FormDetailsScreen}
          options={{
            title: "Form Questions",
            headerLeft: () => (
              <HeaderTopLeft
                icon="arrow-left-thick"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: "",
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            title: "",
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Signup",
            // headerShown: false,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: "Reset Password",
            // headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
