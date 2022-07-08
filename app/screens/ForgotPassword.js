import React, { useEffect, useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";
import axios from "axios";

function ForgotPassword({ navigation }) {
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
      alert("field is requied");
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
      console.log(err);
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
          style={{ width: "50%", height: 50 }}
        />
      </View>

      <View
        style={{
          marginVertical: 90,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
          placeholder="Enter new password"
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton
          title="Forget Password"
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
  },
});
