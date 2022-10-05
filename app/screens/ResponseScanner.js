import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  AlertIOS,
  ToastAndroid,
  TextInput,
} from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import AppTextInput from "../components/Auth/AppTextInput";
import axios from "axios";
import colors from "../config/colors";
import moment from "moment";

function ResponseScanner({ route, navigation }) {
  const responseData = route.params;
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("");
  const [remarks, setRemarks] = useState("");
  const [locationInfo, setLocationInfo] = useState("");

  // const dataSay = {
  //   response: "52",
  //   tracker: "0",
  //   form: "2",
  // };

  useEffect(() => {
    if (route.params != null) {
      handleReadData();
    } else {
      console.log("empty");
    }
  }, [route.parama]);

  const handleReadData = () => {
    // console.log("DATA", responseData);
    var data = new FormData();
    data.append("form", responseData.form);
    data.append("tracker", responseData.tracker);
    data.append("response", responseData.response);


    var config = {
      method: "post",
      url: `https://beta.kpododo.com/api/v1/qr_scan_read.php`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const data = response.data;
        setReadData(data);
        setIdentifier(data?.identifier);
        setCreatedBy(data?.created_by);
        setCreatedAt(data?.created_at);
        setFullName(data?.full_name);
        setLocation(data?.location);
        setLanguage(data?.language);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async () => {
    var bodyFormData = new FormData();
    Object.keys(readData).map((key) => {
      bodyFormData.append(key, readData[key]);
    });
    bodyFormData.append("tracker",readData['tracker_id'])
    bodyFormData.append("response",readData['response_id'])
    bodyFormData.append("form",readData['form_id'])
    bodyFormData.append("remark", remarks);

    setLoading(true);
    axios({
      method: "post",
      url: "/qr_scan_write.php",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        // setReadData(response.data);
        if(response.status === 200){
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
          navigation.navigate("Home");
        }else{
          if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(
              "Unable to submit the Record",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              25,
              50
            );
          } else {
            AlertIOS.alert("Error: Unable to submit the Record");
          }
          navigation.navigate("Home");
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
        <Text style={styles.text}>Full Name: {fullName}</Text>
        <Text style={styles.text}>Identifier:{identifier}</Text>
        <Text style={styles.text}>
          CreatedAt :{moment(createdAt).format("ll")}
        </Text>
        <Text style={styles.text}>Language:{language}</Text>
        <Text style={styles.text}>Location: {location}</Text>
      </View>
      <View style={styles.MainContainer}>
        <AutoGrowingTextInput
          style={styles.remarks}
          value={remarks}
          height={200}
          rows={10}
          onChangeText={(txt) => setRemarks(txt)}
          placeholder={"Remark "}
        />
        {/* <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="map-marker-plus"
          placeholder="Location Info"
          keyboardType="text"
          value={location}
          setValue={setLocation}
        /> */}

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
    height: 550,
    padding: 10,
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 30,
    textTransform: "uppercase",
  },
});
