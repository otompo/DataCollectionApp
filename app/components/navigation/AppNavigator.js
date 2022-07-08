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
import { AuthContext } from "../../context/authContext";
import FormDetailsScreen from "../../screens/FormDetailsScreen";
import ForgotPassword from "../../screens/ForgotPassword";
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
            title: "",
            headerRight: () => (
              <HeaderTabs
                icon="gear"
                name="Settings"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
            headerLeft: () => <HeaderTopLeft />,
          })}
        />
        <Stack.Screen
          name="FormDetailsScreen"
          component={FormDetailsScreen}
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
