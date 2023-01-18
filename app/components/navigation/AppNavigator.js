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
import { StatsDataContext } from "../../context/statsContext"
import FormDetailsScreen from "../../screens/FormDetailsScreen";
import ForgotPassword from "../../screens/ForgotPassword";
import SettingsScreen from "../../screens/SettingsScreen";
import ResponseStats from "../../screens/ResponseStats";
import Response from "../../screens/Response";
import sync_response from "../../utils/sync_response";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const [state, setState] = useContext(AuthContext);
  const [formsStats, setStatsData] = useContext(StatsDataContext)
  const userId = state?.user_id || state?.user?.user_id;
  const phone_number = state?.phone_number || state?.user?.phone_number;

  const [loading, setLoading] = React.useState(false)


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
            headerLeft: () => (
              <HeaderTabs
                icon="bars"
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
            headerRight: () => (
              <HeaderTabs
                icon="refresh"
                name={loading?"":""}
                onPress={() =>
                  //function to sync offline forms to online
                  sync_response(userId,phone_number,setLoading,formsStats,setStatsData)
                }
              />
            ),
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
            title: "",
            headerLeft: ""
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
