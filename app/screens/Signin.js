import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import Text from "@kaloraat/react-native-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppTextInput from "../components/Auth/AppTextInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import colors from "../config/colors";
import { AuthContext } from "../context/authContext";

export const Signin = ({ navigation }) => {
  const [phone_number, setPhone_Number] = useState("5055856458");
  const [password, setPassword] = useState("otompo123@");
  const [loading, setLoading] = useState(false);

  const [state, setState] = useContext(AuthContext);

  useEffect(() => {
    if (state) {
      navigation.navigate("Drawer");
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
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
        alert(data.error);
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
        <Text style={{ fontSize: 20 }}> Welcome</Text>
      </View>

      <View style={{ marginVertical: 80 }}>
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
          placeholder="Set a password"
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton title="Signin" onPress={handleSubmit} loading={loading} />

        <Text center medium color={colors.medium}>
          *Password should have at least 6 characters.
        </Text>
        <View style={{ padding: 15 }}>
          <Text center medium color={colors.medium}>
            By creating an account, you have accepted our Terms of Service and
            Privacy Policy.
          </Text>
        </View>
        <Text center>
          Not yet registered?{" "}
          <Text onPress={() => navigation.navigate("Signup")} color="#ff0000">
            Sign Up
          </Text>
        </Text>
        <Text
          onPress={() => navigation.navigate("ForgotPassword")}
          small
          center
          color="orange"
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
  },
  logo: {
    // width: 80,
    // height: 80,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
});
