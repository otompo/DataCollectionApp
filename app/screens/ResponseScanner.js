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
  SafeAreaView,
} from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown-v2";
import AppText from "../components/Auth/AppText";
import axios from "axios";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";

function ResponseScanner({ route, navigation }) {
  const responseData = route.params;
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [readData, setReadData] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [joined, setJoined] = useState("");

  const [care, setCare] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [week, setWeek] = useState("");
  const [channel, setChannel] = useState("");
  const [language, setLanguage] = useState("");
  const [ownership, setOwnership] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [subdistrict, setSubdistrict] = useState("");
  const [chps_zone, setChps_zone] = useState("");

  const [healthArea, setHealthArea] = useState("");
  const [services, setServices] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (
      responseData ||
      responseData.form != "" ||
      responseData.tracker === "" ||
      responseData.response != ""
    ) {
      handleReadData();
    } else {
      _serveToast("The QR Code is empty");
      navigation.navigate("Home");
    }
  }, [route.params]);

  function _serveToast(tMessage) {
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
  }

  const resetState = () => {
    setLoading(false);
    setDisabled(false);
    setReadData("");
    setIdentifier("");
    setCreatedBy("");
    setJoined("");
    setCare("");
    setPhone("");
    setGender("");
    setAge("");
    setWeek("");
    setChannel("");
    setLanguage("");
    setOwnership("");
    setRegion("");
    setDistrict("");
    setSubdistrict("");
    setChps_zone("");
    setHealthArea("");
    setServices("");
    setComments("");
  };

  const handleReadData = async () => {
    try {
      const data = new FormData();

      data.append("form", responseData.form);
      data.append("tracker", responseData.tracker);
      data.append("response", responseData.response);

      const config = {
        method: "post",
        url: `https://beta.kpododo.com/api/v1/qr_scan_read.php`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      };

      const response = await axios(config);

      if (response.data.identifier) {
        setReadData(response.data);
        setCare(response.data?.servicetype);
        setIdentifier(response.data?.identifier);
        setGender(response.data?.gender);
        setAge(response.data?.age);
        setWeek(response.data?.week);
        setCreatedBy(response.data?.created_by);
        setJoined(response.data?.created_at);
        setLanguage(response.data?.language);
        setChps_zone(response.data?.facility);
      } else {
        setReadData("");
      }
      
    } catch (error) {
      _serveToast("Something went wrong");
      navigation.navigate("Home");
    }
  };

  const handleSubmit = async () => {
    setDisabled(true);
    setLoading(true);

    try {
      const bodyFormData = new FormData();

      if (readData["identifier"]) {
        bodyFormData.append("identifier", readData["identifier"]);
        bodyFormData.append("created_by", readData["created_by"]);
        bodyFormData.append("tracker", readData["tracker"]);
        bodyFormData.append("response", readData["response"]);
        bodyFormData.append("form", readData["form"]);
        bodyFormData.append("healthArea", healthArea);
        bodyFormData.append("services", services);
        bodyFormData.append("comment", comments);
      } else {
        bodyFormData.append("tracker", readData["tracker"]);
        bodyFormData.append("response", readData["response"]);
        bodyFormData.append("form", readData["form"]);
        bodyFormData.append("care", care);
        bodyFormData.append("phone", phone);
        bodyFormData.append("gender", gender);
        bodyFormData.append("age", age);
        bodyFormData.append("week", week);
        bodyFormData.append("channel", channel);
        bodyFormData.append("language", language);
        bodyFormData.append("ownership", ownership);
        bodyFormData.append("region", region);
        bodyFormData.append("district", district);
        bodyFormData.append("subdistrict", subdistrict);
        bodyFormData.append("chps_zone", chps_zone);
      }

      const { status } = await axios({
        method: "post",
        url: "https://beta.kpododo.com/api/v1/qr_scan_write.php",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === 200) {
        resetState();
        _serveToast("Success");
        navigation.navigate("Home");
      } else {
        _serveToast("Unable to submit the Record");
        setLoading(false);
        setDisabled(false);
      }
    } catch (err) {
      _serveToast("Something went wrong 2");
      setLoading(false);
      setDisabled(false);
      navigation.navigate("Home");
    }
    resetState();
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.light }}>
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
        <View style={styles.profileCard}>
          <View style={styles.userInfoSection}>
            <View>
              <AppText
                style={{
                  color: colors.white,
                  fontSize: 30,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
                numberOfLines={1}
              >
                {identifier}
              </AppText>
            </View>
            <TouchableHighlight underlayColor={colors.light}>
              <View style={styles.topcontainer}>
                <View style={styles.image}>
                  <FontAwesome name="user" size={60} color={colors.white} />
                </View>
                <View style={styles.detailsContainer}>
                  <AppText style={styles.subTitle}>
                    <Text>Care:</Text> {care}
                    {"\n"}
                    <Text>Week:</Text> {week}
                    {"\n"}
                    <Text>Language:</Text> {language}
                    {"\n"}
                    <Text>Facility:</Text> {chps_zone}
                    {"\n"}
                    <Text>Joined:</Text> {joined}
                    {"\n"}
                  </AppText>
                </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        {identifier ? (
          <View style={styles.MainContainer}>
            <AppText
              center
              style={{ marginVertical: 15, fontSize: 20, fontWeight: "bold" }}
            >
              Service delivery form
            </AppText>
            <View>
              <Text>Health Area</Text>
              <Dropdown
                label="Select health area"
                data={[
                  {
                    value: "Family Planning",
                  },
                  {
                    value: "MNCH",
                  },
                  {
                    value: "Malaria",
                  },
                  {
                    value: "Nutrition",
                  },
                  {
                    value: "Sexual Reproductive Health & Rights",
                  },
                  {
                    value: "Emerging infectious diseases",
                  },
                ]}
                value={healthArea}
                onChangeText={(text) => setHealthArea(text)}
              />
            </View>
            <View>
              <Text>Services provided</Text>
              <TextInput
                autoComplete="off"
                required
                multiline
                editable
                maxLength={225}
                value={services}
                onChangeText={(text) => setServices(text)}
                style={styles.remarks}
                placeholder={"Services"}
              />
            </View>
            <View>
              <Text>Any comments</Text>
              <TextInput
                autoComplete="off"
                required
                multiline
                editable
                numberOfLines={4}
                maxLength={225}
                value={comments}
                onChangeText={(text) => setComments(text)}
                style={styles._tinput}
                placeholder={"Any comments..."}
              />
            </View>
            <SubmitButton
              title="Submit"
              onPress={handleSubmit}
              disabled={disabled}
              loading={loading}
            />
          </View>
        ) : (
          <View style={styles.MainContainer}>
            <AppText
              center
              style={{ marginVertical: 15, fontSize: 20, fontWeight: "bold" }}
            >
              Register new beneficiary
            </AppText>
            <View>
              <Text>Type of care</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setCare(newValue)}
                value={care}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="anc" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>ANC</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="pnc" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>PNC</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text>Mobile number</Text>
              <TextInput
                editable
                autoComplete="off"
                inputMode="tel"
                keyboardType="phone-pad"
                maxLength={40}
                onChangeText={(text) => setPhone(text)}
                value={phone}
                style={styles.remarks}
                placeholder={"Phone"}
              />
            </View>
            <View>
              <Text>Registrant is (gender)</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setGender(newValue)}
                value={gender}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="female" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Female</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="male" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Male</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text>Age of registrant</Text>
              <TextInput
                autoComplete="off"
                inputMode="numeric"
                keyboardType="numeric"
                editable
                maxLength={40}
                onChangeText={(text) => setAge(text)}
                value={age}
                style={styles.remarks}
                placeholder={"Age"}
              />
            </View>
            <View>
              <Text>Weeks of pregnancy/baby</Text>
              <TextInput
                autoComplete="off"
                inputMode="numeric"
                keyboardType="numeric"
                editable
                maxLength={40}
                onChangeText={(text) => setWeek(text)}
                value={week}
                style={styles.remarks}
                placeholder={"Weeks pregnant/baby"}
              />
            </View>
            <View>
              <Text>How would you like to receive the messages (channel)</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setChannel(newValue)}
                value={channel}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="sms" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>SMS</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="voice" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Voice</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="both" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Both</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text>What is your preferred language</Text>
              <Dropdown
                label="Select language"
                data={[
                  {
                    value: "Dagbani",
                  },
                  {
                    value: "Mampruli",
                  },
                  {
                    value: "Buli",
                  },
                  {
                    value: "Fula",
                  },
                  {
                    value: "Twi",
                  },
                  {
                    value: "Hausa",
                  },
                ]}
                onChangeText={(newValue) => setLanguage(newValue)}
                value={language}
              />
            </View>
            <View>
              <Text>Phone belongs to</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setOwnership(newValue)}
                value={ownership}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="self" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Self</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="partner" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Partner</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="relative" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Relative/Friend</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            <View>
              <Text>Region</Text>
              <RadioButton.Group
                onValueChange={(newValue) => setRegion(newValue)}
                value={region}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="northern" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>Northen</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <RadioButton color={colors.primary} value="northeast" />
                  </View>
                  <View style={{ flex: 8 }}>
                    <Text>North East</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            {region == "northern" ? (
              <>
                <View>
                  <Text>District</Text>
                  <Dropdown
                    label="Select district"
                    data={[
                      {
                        value: "Sagnarigu",
                      },
                    ]}
                    value={district}
                    onChangeText={(text) => setDistrict(text)}
                  />
                </View>

                <View>
                  <Text>Sub district</Text>
                  <Dropdown
                    label="Select subdistrict"
                    data={[
                      {
                        value: "Choggu",
                      },
                      {
                        value: "Sagnarigu",
                      },
                      {
                        value: "Taha",
                      },
                    ]}
                    value={subdistrict}
                    onChangeText={(text) => setSubdistrict(text)}
                  />
                </View>
                <View>
                  <Text>CHPS zone</Text>
                  <Dropdown
                    label="Select CHPS"
                    data={[
                      {
                        value: "Naaluro CHPS",
                      },
                      {
                        value: "Sognaayilli CHPS",
                      },
                      {
                        value: "Gurugu CHPS",
                      },
                      {
                        value: "TACE CHPS",
                      },
                      {
                        value: "BACE CHPS",
                      },
                      {
                        value: "Kpene CHPS",
                      },
                      {
                        value: "Shishegu CHPS",
                      },
                      {
                        value: "Nyanshegu CHPS",
                      },
                      {
                        value: "Taha CHPS",
                      },
                      {
                        value: "Ward K CHPS",
                      },
                      {
                        value: "Kalpohini CHPS",
                      },
                      {
                        value: "CHNT CHPS",
                      },
                      {
                        value: "Kulaa CHPS",
                      },
                      {
                        value: "Gbalahi CHPS",
                      },
                      {
                        value: "Fuo CHPS",
                      },
                      {
                        value: "Gblima CHPS",
                      },
                      {
                        value: "Estate CHPS",
                      },
                    ]}
                    value={chps_zone}
                    onChangeText={(text) => setChps_zone(text)}
                  />
                </View>
              </>
            ) : (
              <>
                <View>
                  <Text>District</Text>
                  <Dropdown
                    label="Select district"
                    data={[
                      {
                        value: "Mamprugu Moagduri",
                      },
                    ]}
                    value={district}
                    onChangeText={(text) => setDistrict(text)}
                  />
                </View>
                <View>
                  <Text>Sub district</Text>
                  <Dropdown
                    label="Select subdistrict"
                    data={[
                      {
                        value: "Yagaba",
                      },
                      {
                        value: "Kubori",
                      },
                      {
                        value: "Kunkua",
                      },
                      {
                        value: "Yikpabongo",
                      },
                    ]}
                    value={subdistrict}
                    onChangeText={(text) => setSubdistrict(text)}
                  />
                </View>
                <View>
                  <Text>CHPS zone</Text>
                  <Dropdown
                    label="Select CHPS"
                    data={[
                      {
                        value: "Loagri CHPs",
                      },
                      {
                        value: "Soo CHPs",
                      },
                      {
                        value: "Gbima CHPS",
                      },
                      {
                        value: "Kpatorigu CHPS",
                      },
                      {
                        value: "Kuburu CHPS",
                      },
                      {
                        value: "Namoo CHPS",
                      },
                      {
                        value: "Zanwara CHPS",
                      },
                      {
                        value: "Katigre CHPS",
                      },
                      {
                        value: "Nangrumah CHPS",
                      },
                      {
                        value: "Tantala CHPS",
                      },
                      {
                        value: "Yikpabongo CHPS",
                      },
                    ]}
                    value={chps_zone}
                    onChangeText={(text) => setChps_zone(text)}
                  />
                </View>
              </>
            )}
            <SubmitButton
              title="Submit"
              onPress={handleSubmit}
              disabled={disabled}
              loading={loading}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 20,
    marginBottom: 10,
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
  _tinput: {
    backgroundColor: colors.white,
    borderBottomColor: "#171717",
    borderBottomWidth: 0.5,
    marginVertical: 10,
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
  profileCard: {
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
