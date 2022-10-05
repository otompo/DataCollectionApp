import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ToastAndroid,
  AlertIOS,
  Platform,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";

export const Signin = ({ navigation }) => {
  const [server_address, setServer_Address] = useState("https://beta.kpododo.com/api/v1");
  const [phone_number, setPhone_Number] = useState("5055856458");
  const [password, setPassword] = useState("otompo123@");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  useEffect(() => {
    if (user) {
      navigation.navigate("Drawer");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    AsyncStorage.setItem("baseUrl",server_address)
    if (!phone_number || !password) {
      alert("All fields are requied");
      setLoading(false);
      return;
    }
    let countryCode = "+233";
    try {
      const { data } = await axios.get(
        `/userlogindetails?phone_number=${
          countryCode + phone_number
        }&password=${password}`
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
          console.log(data.eror.response)
          AlertIOS.alert(data.error);
        }
        setLoading(false);
      } else {
        const prepData = { user: data, status: true };
        await AsyncStorage.setItem("@auth", JSON.stringify(prepData));
        setState(prepData);
        // setPassword("");
        // setPhone_Number("");
        setLoading(false);
        navigation.navigate("Drawer");
      }
    } catch (err) {
      console.log(err);
      alert(err);
      setLoading(false);
    }
  };

  const loadAsyncStorage = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("data from AsyncStorage", data);
  };

  // loadAsyncStorage();

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
          style={{ width: "83%", height: 100 }}
        />
        <Text
          center
          style={{ marginTop: 20, fontWeight: "bold", fontSize: 18 }}
        >
          Welcome Back, Login below
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
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton title="Log In" onPress={handleSubmit} loading={loading} />

        <Text center style={{ marginTop: 10 }}>
          Don't have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Signup")}
            color={colors.primary}
          >
            Create Account
          </Text>
        </Text>

        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          center
          color={colors.primary}
          style={{ marginTop: 15 }}
        >
          Forgot Password?
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
});
