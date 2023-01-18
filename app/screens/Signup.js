import React, { useEffect, useState, useContext } from "react";
import * as Battery from "expo-battery";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ToastAndroid,
  AlertIOS,
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
// import { AuthContext } from "../context/authContext";

export const Signup = ({ navigation }) => {
  const [server_address, setServer_Address] = useState(
    "https://beta.kpododo.com/api/v1"
  );
  const [fullName, setFullName] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [signUptime, setSignUptime] = useState(new Date());
  const [appVersion, setAppVersion] = useState(nativeApplicationVersion);
  const [androidVersion, setAndroidVersion] = useState(Platform.Version);
  const [mobileModel, setMobileModel] = useState(Platform.__constants.Model);
  const [networkUsed, setNetworkUsed] = useState("");
  const [batteryLevel, setBatteryLevel] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // const [state, setState] = useContext(AuthContext);
  // const authenticated = state && state.status !== "" && state.user !== null;

  useEffect(() => {
    getCellular();
    getBatteryLevel();
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

  const getBatteryLevel = async () => {
    const batteryLevel = await Battery.getBatteryLevelAsync();
    setBatteryLevel(batteryLevel * 100);
  };

  const getCellular = async () => {
    const cellular = await Cellular.carrier;
    setNetworkUsed(cellular);
  };

  const handleSubmit = async () => {
    let countryCode = "+233";
    setLoading(true);
    setDisabled(true);

    if (!fullName || !phone_number || !password) {
      _serveToast("All fields are required");
      setLoading(false);
      setDisabled(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `/usersignup?full_name=${fullName}&phone_number=${
          countryCode + phone_number
        }&password=${password}&batteryLevel=${batteryLevel}
        &networkUsed=${networkUsed}&signUptime=${signUptime}&appVersion=${appVersion}&androidVersion=${androidVersion}&mobileModel=${mobileModel}`
      );

      if (data.error) {
        _serveToast(data.error);
        setLoading(false);
        setDisabled(false);
      } else {
        _serveToast("Account created");
        setFullName("");
        setPhone_Number("");
        setPassword("");
        setLoading(false);
        setDisabled(false);
        navigation.navigate("Signin");
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
            value={phone_number}
            setValue={setPhone_Number}
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
          loading={loading}
          disabled={disabled}
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
