import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  AlertIOS,
  ToastAndroid,
  TextInput,
  TouchableHighlight,
} from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import AppText from "../components/Auth/AppText";
import axios from "axios";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
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
  const [gender, setGender] = useState("");
  const [care, setCare] = useState("");
  const [week, setWeek] = useState("");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (route.params != null) {
      handleReadData();
    } else {
      console.log("empty");
    }
  }, [route.parama]);

  const handleReadData = () => {
    //console.log("DATA", responseData);
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
        console.log("DATA:", data);
        setReadData(data);
        setIdentifier(data?.identifier);
        setCreatedBy(data?.created_by);
        setCreatedAt(data?.created_at);
        setFullName(data?.full_name);
        setLocation(data?.location);
        setLanguage(data?.language);
        setGender(data?.gender);
        setCare(data?.care);
        setWeek(data?.week);
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
    bodyFormData.append("tracker", readData["tracker_id"]);
    bodyFormData.append("response", readData["response_id"]);
    bodyFormData.append("form", readData["form_id"]);
    bodyFormData.append("remark", remarks);

    setLoading(true);
    axios({
      method: "post",
      url: "/qr_scan_write.php",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        if (response.status === 200) {
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
        } else {
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
      <AppText
        center
        style={{
          marginVertical: 5,
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Subscriber Information
      </AppText>
      <View style={styles.questionCard}>
        <View style={styles.userInfoSection}>
          <TouchableHighlight underlayColor={colors.light}>
            <View style={styles.topcontainer}>
              <View style={styles.image}>
                <FontAwesome name="user" size={60} color={colors.white} />
              </View>
              <View style={styles.detailsContainer}>
                <AppText style={styles.title} numberOfLines={1}>
                  {identifier}
                </AppText>
                <AppText style={styles.subTitle}>
                  <Text>Gender:</Text> {gender}
                  {"\n"}
                  <Text>Care:</Text> {care}
                  {"\n"}
                  <Text>Week:</Text> {week}
                  {"\n"}
                  <Text>Language:</Text> {language}
                  {"\n"}
                  <Text>Facility:</Text> {location}
                  {"\n"}
                </AppText>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.MainContainer}>
        <AppText center style={{ marginVertical: 5, fontSize: 20 }}>
          Enter your remarks here
        </AppText>
        <AutoGrowingTextInput
          style={styles.remarks}
          value={remarks}
          height={200}
          rows={10}
          onChangeText={(txt) => setRemarks(txt)}
          placeholder={"Remark "}
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
  topcontainer: {
    flexDirection: "row",
    padding: 5,
  },
  MainContainer: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
  userInfoSection: {
    backgroundColor: colors.primary,
    marginVertical: -10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: colors.secoundary,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    color: colors.white,
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.white,
    fontSize: 14,
  },
  detailsContainer: {
    marginLeft: 20,
    justifyContent: "center",
    flex: 1,
  },
  questionCard: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.primary,
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