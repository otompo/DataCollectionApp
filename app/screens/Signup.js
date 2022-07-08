import React, { useEffect, useState, useContext } from "react";
import * as Battery from "expo-battery";
import { StyleSheet, View, Platform, Image } from "react-native";
import * as Cellular from "expo-cellular";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import { nativeApplicationVersion } from "expo-application";
import axios from "axios";
import FrontBanner from "../components/Banner/FrontBanner";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";

export const Signup = ({ navigation }) => {
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

  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.status !== "" && state.user !== null;

  useEffect(() => {
    getCellular();
    getBatteryLevel();
  }, []);

  // useEffect(() => {
  //   if (authenticated) {
  //     navigation.navigate("Drawer");
  //   }
  // }, [authenticated]);

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
      const { data } = await axios.get(
        `/usersignup?fullName=${fullName}&phone_number=${
          countryCode + phone_number
        }&password=${password}&batteryLevel=${batteryLevel}
        &networkUsed=${networkUsed}&signUptime=${signUptime}&appVersion${appVersion}&androidVersion${androidVersion}&mobileModel${mobileModel}`
      );
      if (data.error) {
        alert(data.error);
        setLoading(false);
      } else {
        // save in context
        // console.log(data);
        // setState(data);
        // await AsyncStorage.setItem("@auth", JSON.stringify(data));
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
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Image
          source={require("../assets/logo1.png")}
          style={{ width: "30%", height: 30 }}
        />
        <Text style={{ fontSize: 16 }}>v {nativeApplicationVersion}</Text>
      </View>
      <View style={{ height: 290 }}>
        <FrontBanner />
      </View>

      <View style={styleSheet.MainContainer}>
        <AppTextInput
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          placeholder="Enter full name"
          value={fullName}
          setValue={setFullName}
        />

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          placeholder="Enter phone number"
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
          placeholder="Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <View>
          <SubmitButton
            title="SIGN UP"
            onPress={handleSubmit}
            loading={loading}
            bwidth={330}
          />
        </View>
      </View>

      <View style={{ marginBottom: 15 }}>
        <Text center>
          Already Joined?{" "}
          <Text onPress={() => navigation.navigate("Signin")} color="#ff0000">
            Sign In
          </Text>
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
  },
});

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  heading: {
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 20,
    color: "black",
  },

  phoneNumberView: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    width: "80%",
    padding: 8,
    backgroundColor: "#00B8D4",
  },

  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
