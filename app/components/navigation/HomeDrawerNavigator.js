import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../../screens/DrawerContent";
import { HomeScreen } from "../../screens/HomeScreen";
import colors from "../../config/colors";
import Profile from "../../screens/Profile";
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
    <Screen name="ResponseScanner" component={ResponseScanner} />
    {/* 
    <Screen name="Login" component={LoginScreen} />
    <Screen name="Register" component={RegisterScreen} /> */}
  </Navigator>
);

const themedStyles = StyleService.create({
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    marginHorizontal: 16,
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 8,
  },
});
