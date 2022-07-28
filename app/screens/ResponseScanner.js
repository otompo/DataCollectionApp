import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  AlertIOS,
  ToastAndroid,
} from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import AppTextInput from "../components/Auth/AppTextInput";
import axios from "axios";
import colors from "../config/colors";
import moment from "moment";

function ResponseScanner({ route }) {
  const responseData = route.params;
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [remarks, setRemasks] = useState("");
  const [locationInfo, setLocationInfo] = useState("");

  // const dataSay = {
  //   response: "52",
  //   tracker: "0",
  //   form: "2",
  // };

  useEffect(() => {
    handleReadData();
  }, []);

  const handleReadData = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("form", responseData.form);
    bodyFormData.append("response", responseData.response);
    bodyFormData.append("tracker", responseData.tracker);

    axios({
      method: "post",
      url: "/qr_scan_read.php",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        setReadData(response.data);
        setIdentifier(response.data.identifier);
        setCreatedBy(response.data.created_by);
        setCreatedAt(response.data.created_at);
        setFullName(response.data.full_name);
        setLocation(response.data.location);
        setLanguage(response.data.language);
      })
      .catch(function (err) {
        console.log(err.response);
      });
  };

  const handleSubmit = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("form", responseData.form);
    bodyFormData.append("response", responseData.response);
    bodyFormData.append("tracker", responseData.tracker);
    setLoading(true);
    axios({
      method: "post",
      url: "/qr_scan_write.php",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // setReadData(response.data);
        // console.log("response Data", response);
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

        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.questionCard}>
        {/* <Text>{responseData}</Text> */}
        <Text>Full Name: {fullName}</Text>
        <Text>Identifier:{identifier}</Text>
        <Text>CreatedAt :{moment(createdAt).format("ll")}</Text>
        <Text>Language:{language}</Text>
        <Text>Location: {location}</Text>
      </View>
      <View style={styles.MainContainer}>
        <AutoGrowingTextInput
          style={styles.remarks}
          value={remarks}
          // onChangeText={onChange}
          placeholder={"Remask "}
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="map-marker-plus"
          placeholder="Location Info"
          keyboardType="text"
          value={location}
          setValue={setLocation}
        />

        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          placeholder="Phone Number"
          keyboardType="numeric"
          value={identifier}
          setValue={setIdentifier}
        />

        <SubmitButton title="Submit" onPress={handleSubmit} loading={loading} />
      </View>
    </KeyboardAwareScrollView>
  );
}

export default ResponseScanner;

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
  questionCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  remarks: {
    backgroundColor: colors.light,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    height: 50,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});
