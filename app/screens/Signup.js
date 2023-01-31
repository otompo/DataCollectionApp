import React, { useEffect, useState, useContext } from "react";
import * as Battery from "expo-battery";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
} from "react-native";
import * as Cellular from "expo-cellular";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import { nativeApplicationVersion } from "expo-application";
import axios from "axios";
import colors from "../config/colors";
import AppText from "../components/Auth/AppText";
import _serveToast from "../utils/_serveToast";
import { API } from "../config/baseUrl";

export const Signup = ({ navigation }) => {

  const [serverAddress, setServerAddress] = useState(API);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [signUptime, setSignUptime] = useState(new Date());
  const [appVersion, setAppVersion] = useState(nativeApplicationVersion);
  const [androidVersion, setAndroidVersion] = useState(Platform.Version);
  const [mobileModel, setMobileModel] = useState(Platform.__constants.Model);
  const [networkUsed, setNetworkUsed] = useState("");
  const [batteryLevel, setBatteryLevel] = useState("");
  const [isLoading, seIisLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    getCellular();
    getBatteryLevel();
  }, []);

  const getBatteryLevel = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel * 100);
  };

  const getCellular = async () => {
    const cellular = await Cellular.getCarrierNameAsync();
    setNetworkUsed(cellular);
  };

  const validate = () => {
    let errors = {};
    if (!fullName) errors.fullName = "Full Name is required";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!password) errors.password = "Password is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    seIisLoading(true);
    setIsDisabled(true);

    if (!validate()) {
      _serveToast("All fields are required");
      seIisLoading(false);
      setIsDisabled(false);
      return;
    }

    try {
      const { data } = await axios.post(
        serverAddress +
          `/usersignup?full_name=${fullName}&phone_number=${phoneNumber}&password=${password}&batteryLevel=${batteryLevel}
      &networkUsed=${networkUsed}&signUptime=${signUptime}&appVersion=${appVersion}&androidVersion=${androidVersion}&mobileModel=${mobileModel}`
      );

      if (!data.status) {
        _serveToast(data.message);
        seIisLoading(false);
        setIsDisabled(false);
      } else {
        _serveToast("Great, account created");
        setPhoneNumber("");
        setPassword("");
        seIisLoading(false);
        setIsDisabled(false);
        navigation.navigate("Signin");
      }
    } catch (err) {
      _serveToast("Something went wrong");
      seIisLoading(false);
      setIsDisabled(false);
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
            Create an account
          </AppText>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <AppTextInput
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            placeholder="Full Name"
            value={fullName}
            setValue={setFullName}
          />
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="phone"
            placeholder="Phone Number"
            keyboardType="numeric"
            value={phoneNumber}
            setValue={setPhoneNumber}
            maxLength={10}
          />
        </View>
        <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
          <AppTextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            value={password}
            setValue={setPassword}
            placeholder="Set Password"
            secureTextEntry
            textContentType="password"
            autoCompleteType="password"
          />
        </View>

        <View>
          <Text color={colors.medium}>
            Password should have at least 6 characters.
          </Text>
        </View>

        <SubmitButton
          title="CREATE ACCOUNT"
          onPress={handleSubmit}
          isLoading={isLoading}
          isDisabled={isDisabled}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text color={colors.primary}>Have account?</Text>
          </View>
          <View>
            <Text
              onPress={() => navigation.navigate("Signin")}
              color={colors.primary}
            >
              {" "}
              Login
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
