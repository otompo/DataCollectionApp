import React, { useState, useContext, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";
import AppText from "../components/Auth/AppText";
import _serveToast from "../utils/_serveToast";
import { API } from "../config/baseUrl";
import axios from "axios";

export const Signin = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const { user } = authState;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    AsyncStorage.setItem("baseURL", API);
    if (user && user.status === true) {
      navigation.navigate("Drawer");
    }
  }, [user]);

  const netInfoListener = useRef();
  useEffect(() => {
    netInfoListener.current = NetInfo.addEventListener((user) => {
      setIsConnected(user.isInternetReachable);
    });
  }, []);

  const _handleOfflineLogin = async () => {
    try {
      const loggedUser = JSON.parse(
        await AsyncStorage.getItem("@auth")
      );

      if (loggedUser && loggedUser.status === true) {
        setAuthState(loggedUser);
      }
    } catch (err) {
      _serveToast("Something went wrong");
    }
  };

  const _handleLogin = async () => {
    
        setIsLoading(true);
        setIsDisabled(true);

      try {
            const { data } = await axios.get(
              API +
                `/userlogindetails?phone_number=${phoneNumber}&password=${password}`
            );

            if(data && data.status === true)
            {
              const loggedUser = { user: data, status: true };
              await AsyncStorage.setItem(
                "@auth",
                JSON.stringify(loggedUser)
              );
              setAuthState(loggedUser);
              setIsLoading(false);
              setIsDisabled(false);
              navigation.navigate("Drawer");
            } else {
              _serveToast("Login failed, try again");
              return;
            }

      } catch (error) {
        _serveToast("Something went wrong");
        return;
      }
  };

  const handleSubmit = async () => {

    if (!phoneNumber || !password) {
      _serveToast("All fields are required");
      return;
    }
      _handleLogin();

      setIsLoading(false);
      setIsDisabled(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.MainContainer}>
        <View style={styles.logoContainer}>
          <Image source={require("../assets/collect-logo.png")} />
          <AppText center style={styles.title}>
            Log into your account
          </AppText>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <AppTextInput
            autoCorrect={false}
            icon="phone"
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            setValue={setPhoneNumber}
            maxLength={10}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            value={password}
            setValue={setPassword}
            placeholder="Password"
            secureTextEntry
            textContentType="password"
            autoCompleteType="password"
          />
        </View>

        <SubmitButton
          title="Login"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isDisabled}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text color={colors.primary}>No account?</Text>
          </View>
          <View>
            <Text
              onPress={() => navigation.navigate("Signup")}
              color={colors.primary}
            >
              {" "}
              Signup
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
  MainContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});
