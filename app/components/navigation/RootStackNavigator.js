import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const RootStack = createStackNavigator();

const RootStackNavigator = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Group>
      <RootStack.Screen name="LoginScreen" component={LoginScreen} />
      <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </RootStack.Group>
  </RootStack.Navigator>
);

export default RootStackNavigator;
