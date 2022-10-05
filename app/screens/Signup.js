import React, { useEffect, useState, useContext } from "react";
import * as Battery from "expo-battery";
import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import * as Cellular from "expo-cellular";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import { nativeApplicationVersion } from "expo-application";
import axios from "axios";
import colors from "../config/colors";
// import { AuthContext } from "../context/authContext";

export const Signup = ({ navigation }) => {
  const [server_address, setServer_Address] = useState("beta.kpododo.com");
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

  // const [state, setState] = useContext(AuthContext);
  // const authenticated = state && state.status !== "" && state.user !== null;

  useEffect(() => {
    getCellular();
    getBatteryLevel();
  }, []);

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
    if (!fullName || !phone_number || !password) {
      alert("All fields are requied");
      setLoading(false);
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
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            data.error,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert(data.error);
        }
        setLoading(false);
      } else {
        // save in context
        // console.log(data);
        // setState(data);
        // await AsyncStorage.setItem("@auth", JSON.stringify(data));
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            "Success",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert("Success");
        }
        setFullName("");
        setPhone_Number("");
        setPassword("");
        navigation.navigate("Signin");
        setLoading(false);
      }
    } catch (err) {
      console.log(err.response.data.message);
      alert(err.response.data.message);
      setLoading(false);
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
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/syncLogo-1.png")}
          style={{ width: "80%", height: 100 }}
        />
        <Text
          center
          style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}
        >
          Welcome, Create an Account below
        </Text>
      </View>

      <View style={styles.MainContainer}>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="web"
          placeholder="Server Address"
          keyboardType="text"
          value={server_address}
          setValue={setServer_Address}
        />

        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="Full Name"
          value={fullName}
          setValue={setFullName}
        />

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          placeholder="Phone Number"
          keyboardType="numeric"
          value={phone_number}
          setValue={setPhone_Number}
        />

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
        <Text color={colors.medium}>
          Password should have at least 6 characters.
        </Text>

        <SubmitButton
          title="CREATE ACCOUNT"
          onPress={handleSubmit}
          loading={loading}
        />

        <View style={{ marginVertical: 10 }}>
          <Text center>
            By creating an account, you have accepted our Terms of Service and
            Privacy Policy.
          </Text>
        </View>

        <View>
          <Text center>
            Already Joined?{" "}
            <Text
              onPress={() => navigation.navigate("Signin")}
              color={colors.primary}
            >
              Log In
            </Text>
          </Text>
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
    paddingHorizontal: -10,
  },
});
