import React, { useEffect, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import AppText from "../components/Auth/AppText";

function ForgotPassword({ navigation }) {
  const [server_address, setServer_Address] = useState("beta.kpododo.com");
  const [phone_number, setPhone_Number] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(AuthContext);
  const authenticated = state && state.status !== "" && state.user !== null;

  useEffect(() => {
    if (authenticated) {
      navigation.navigate("Drawer");
    }
  }, [authenticated]);

  const handleSubmit = async () => {
    setLoading(true);
    if (!phone_number) {
      alert("Phone Number field is requied");
      setLoading(false);
      return;
    }
    let countryCode = "+233";
    try {
      const { data } = await axios.get(
        `/forgotpassword?&phone_number=${
          countryCode + phone_number
        }&password=${password}`
      );
      navigation.navigate("Signin");
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "Success",
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
      } else {
        AlertIOS.alert("Success");
      }
      setLoading(false);
    } catch (err) {
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

      <View style={styles.MainContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/collect-logo.png")}
        />
          <AppText center style={styles.title}>
            Reset Password
          </AppText>
      </View>
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
          placeholder="New Password"
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton
          title="Submit Password"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ForgotPassword;

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
    paddingHorizontal: -15,
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
    marginBottom: 50
  },
  title: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center"
  },
});