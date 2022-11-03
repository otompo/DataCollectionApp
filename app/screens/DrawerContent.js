import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import NetInfo from "@react-native-community/netinfo";
import { AuthContext } from "../context/authContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import { Divider } from "@ui-kitten/components";
import ListItem from "../components/ListItem";

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const [state, setState] = useContext(AuthContext);
  const [networkConnection, setNetworkConnection] = useState("");
  const navigation = useNavigation();

  const handleLogoutSubmit = async () => {
    setState({ user: null, status: null });
    await AsyncStorage.removeItem("@auth");
    navigation.navigate("Signin");
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <ListItem
              icons="user"
              title={state && state.user && state.user.full_name}
              iconc="phone"
              subTitle={state && state.user && state.user.phone_number}
              oncono="circle"
              offcono="circle"
              subSubTitle={`${networkConnection ? " Online" : " Offline"} `}
            />
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="form-select" color={colors.primary} size={40} />
              )}
              label="Forms"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />

            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="qrcode" color={colors.primary} size={40} />
              )}
              label="QR Scanner"
              onPress={() => {
                props.navigation.navigate("QRCodeScanner");
              }}
            />
          </Drawer.Section>
        </View>
        {/* <Drawer.Section> */}
          {/* <DrawerItem
            icon={({ color, size }) => (
              <Icon name="account-outline" color={colors.primary} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="headset" color={colors.primary} size={size} />
            )}
            label="Help"
            onPress={() => {
              props.navigation.navigate("Help");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="cog" color={colors.primary} size={size} />
            )}
            label="Application Settings"
            onPress={() => {
              props.navigation.navigate("SettingsScreen");
            }}
          /> */}
        {/* </Drawer.Section> */}
      </DrawerContentScrollView>

      <Drawer.Section
      // style={styles.bottomDrawerSection}
      >
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="exit-to-app" color={colors.danger} size={size} />
          )}
          label="Logout"
          onPress={handleLogoutSubmit}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    backgroundColor: colors.primary,
    marginVertical: -10,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
