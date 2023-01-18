import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";
import AppText from "../components/Auth/AppText";
import axios from "axios";

export const Signin = ({ navigation }) => {
  const [server_address, setServer_Address] = useState(
    "https://beta.kpododo.com/api/v1"
  );
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [state, setState] = useContext(AuthContext);
  const { user } = state;

  useEffect(() => {
    if (user) {
      navigation.navigate("Drawer");
    }
  }, []);

  const _serveToast = (tMessage) => {
    if (Platform.OS === "android") {
      ToastAndroid.showWithGravityAndOffset(
        tMessage + " ",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } else {
      AlertIOS.alert("Error: " + tMessage + " ");
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setDisabled(true);

    AsyncStorage.setItem("baseUrl", server_address);

    if (!phone_number || !password) {
      _serveToast("All fields are required");
      setLoading(false);
      setDisabled(false);
      return;
    }

    let countryCode = "+233";
    try {
      const { data } = await axios.get(
        `/userlogindetails?phone_number=${
          countryCode + phone_number
        }&password=${password}`
      );

      if (!data || data.status === false || data.data === null) {
        _serveToast("Login failed, try again");
        setLoading(false);
        setDisabled(false);
        setPassword("");
      } else {
        const prepData = { user: data, status: true };
        await AsyncStorage.setItem("@auth", JSON.stringify(prepData));
        setState(prepData);
        setLoading(false);
        setDisabled(false);
        navigation.navigate("Drawer");
      }
    } catch (err) {
      _serveToast("Something went wrong");
      setLoading(false);
      setDisabled(false);
    }
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
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phone_number}
            setValue={setPhone_Number}
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
          loading={loading}
          disabled={disabled}
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
