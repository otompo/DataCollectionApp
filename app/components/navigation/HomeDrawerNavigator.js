import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../../screens/DrawerContent";
import { HomeScreen } from "../../screens/HomeScreen";
import colors from "../../config/colors";
import Profile from "../../screens/Profile";
import QRCodeScanner from "../../screens/QRCodeScanner";
import ResponseScanner from "../../screens/ResponseScanner";

const { Navigator, Screen } = createDrawerNavigator();

export const HomeDrawerNavigator = () => (
  <Navigator
    screenOptions={{
      drawerPosition: "left",
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerShown: false,
      drawerActiveBackgroundColor: colors.secondary,
      drawerActiveTintColor: colors.white,
      drawerLabelStyle: { marginLeft: 10 },
    }}
    drawerContent={(props) => <DrawerContent {...props} />}
  >
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Profile" component={Profile} />
    <Screen name="QRCodeScanner" component={QRCodeScanner} />
    <Screen name="ResponseScanner" component={ResponseScanner} />
  </Navigator>
);
