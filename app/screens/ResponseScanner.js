import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RadioButton } from "react-native-paper";
import { Dropdown } from "react-native-material-dropdown-v2";
import AppText from "../components/Auth/AppText";
import axios from "axios";
import colors from "../config/colors";
import { FontAwesome } from "@expo/vector-icons";
import _serveToast from "../utils/_serveToast";
import { API } from "../config/baseUrl";

function ResponseScanner({ route, navigation }) {
  const responseData = route.params;
  const [isLoading, setIsLoading] = useState(false);
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
  const [parity, setParity] = useState("");
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
      setIsLoading(true);
      handleReadData();
    } else {
      _serveToast("The QR Code is empty");
      navigation.navigate("Home");
    }
  }, [route.params]);

  const _switchDistrict = (district) => {
        switch (district) {
          case "East Mamprusi":
            return [
              {
                value: "Gambaga",
              },
              {
                value: "Gbintiri",
              },
              {
                value: "Langbinsi",
              },
              {
                value: "Nalerigu",
              },
              {
                value: "Jawani",
              },
              {
                value: "Kolinvai",
              },
              {
                value: "Sakogu",
              },
            ];
          case "Mamprugu Moagduri":
            return [
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
            ];
        }
  }

  const _switchSubdistrict = (subdistrict) => {
    switch (subdistrict) {
      case "Yagaba":
        return [
            {
              value: "Loagri CHPs",
            },
            {
              value: "Soo CHPs",
            },
            {
              value: "Gbima CHPS",
            },
          ];
      case "Kubori":
        return [
            {
              value: "Kpatorigu CHPS",
            },
            {
              value: "Kubugu CHPS",
            },
            {
              value: "Namoo CHPS",
            },
            {
              value: "Zanwara CHPS",
            },
          ];
      case "Kunkua":
        return [
            {
              value: "Katigre CHPS",
            },
          ];
      case "Yikpabongo":
        return [
            {
              value: "Nangrumah CHPS",
            },
            {
              value: "Tantala CHPS",
            },
            {
              value: "Yikpabongo CHPS",
            },
          ];
    }
  }

  const resetState = () => {
    setReadData("");
    setIdentifier("");
    setCreatedBy("");
    setJoined("");
    setCare("");
    setPhone("");
    setGender("");
    setAge("");
    setParity("");
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
        url: API + `/qr_scan_read.php`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data,
      };

      const response = await axios(config);

      if (response) {
        setIsLoading(false);
      }

      if (response.data.identifier !== null) {
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
        resetState();
        setCreatedBy(response.data?.created_by);
      }
    } catch (error) {
      _serveToast("Something went wrong");
      navigation.navigate("Home");
    }
  };

  const handleSubmit = async () => {
    setDisabled(true);
    setIsLoading(true);

    try {
      const bodyFormData = new FormData();

      if (readData["identifier"] && readData["identifier"] > 0) {
        bodyFormData.append("identifier", readData["identifier"]);
        bodyFormData.append("created_by", readData["created_by"]);
        bodyFormData.append("tracker", readData["tracker"]);
        bodyFormData.append("response", readData["response"]);
        bodyFormData.append("form", readData["form"]);
        bodyFormData.append("healthArea", healthArea);
        bodyFormData.append("services", services);
        bodyFormData.append("comment", comments);
      } else {
        bodyFormData.append("tracker", responseData.tracker);
        bodyFormData.append("response", responseData.response);
        bodyFormData.append("form", responseData.form);
        bodyFormData.append("created_by", createdBy);
        bodyFormData.append("care", care);
        bodyFormData.append("phone", phone);
        bodyFormData.append("gender", gender);
        bodyFormData.append("age", age);
        bodyFormData.append("week", week);
        bodyFormData.append("parity", parity);
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
        url: API + "/qr_scan_write.php",
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (status === 200) {
        resetState();
        setIsLoading(false);
        setDisabled(false);
        _serveToast("Great! form is submitted.");
        navigation.navigate("Home");
      } else {
        _serveToast("Unable to submit the record");
        setIsLoading(false);
        setDisabled(false);
      }
    } catch (err) {
      _serveToast("Something went wrong");
      setIsLoading(false);
      setDisabled(false);
      navigation.navigate("Home");
    }
    setIsLoading(false);
    setDisabled(false);
    resetState();
  };

  return (
    <SafeAreaView>
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
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: 1,
              marginVertical: 200,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>Loading Information</Text>
          </View>
        ) : (
          <>
            {identifier ? (
              <>
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
                          <FontAwesome
                            name="user"
                            size={60}
                            color={colors.white}
                          />
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
                <View style={styles.MainContainer}>
                  <AppText
                    center
                    style={{
                      marginVertical: 15,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
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
                          value: "Maternal & Child Health",
                        },
                        {
                          value: "Malaria",
                        },
                        {
                          value: "Nutrition",
                        },
                        {
                          value: "WASH",
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
                    loading={isLoading}
                  />
                </View>
              </>
            ) : (
              <>
                <View style={styles.MainContainer}>
                  <AppText
                    center
                    style={{
                      marginVertical: 15,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Register new beneficiary
                  </AppText>
                  <View>
                    <Text>Type of care</Text>
                    <RadioButton.Group
                      onValueChange={(newValue) => setCare(newValue)}
                      value={care}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="anc" />
                        </View>
                        <View>
                          <Text>ANC</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="pnc" />
                        </View>
                        <View>
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
                      maxLength={10}
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="female" />
                        </View>
                        <View>
                          <Text>Female</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="male" />
                        </View>
                        <View>
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
                      maxLength={2}
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
                      maxLength={2}
                      onChangeText={(text) => setWeek(text)}
                      value={week}
                      style={styles.remarks}
                      placeholder={"Weeks pregnant/baby"}
                    />
                  </View>
                  <View>
                    <Text>Number of times you have given birth</Text>
                    <TextInput
                      autoComplete="off"
                      inputMode="numeric"
                      keyboardType="numeric"
                      editable
                      maxLength={2}
                      onChangeText={(text) => setParity(text)}
                      value={parity}
                      style={styles.remarks}
                      placeholder={
                        "No. of deliveries with atleast 6 months gestation"
                      }
                    />
                  </View>
                  <View>
                    <Text>
                      How would you like to receive the messages (channel)
                    </Text>
                    <RadioButton.Group
                      onValueChange={(newValue) => setChannel(newValue)}
                      value={channel}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="sms" />
                        </View>
                        <View>
                          <Text>SMS</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="voice" />
                        </View>
                        <View>
                          <Text>Voice</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="both" />
                        </View>
                        <View>
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="self" />
                        </View>
                        <View>
                          <Text>Self</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton color={colors.primary} value="partner" />
                        </View>
                        <View>
                          <Text>Partner</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton
                            color={colors.primary}
                            value="relative"
                          />
                        </View>
                        <View>
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
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton
                            color={colors.primary}
                            value="northern"
                          />
                        </View>
                        <View>
                          <Text>Northen</Text>
                        </View>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View>
                          <RadioButton
                            color={colors.primary}
                            value="northeast"
                          />
                        </View>
                        <View>
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
                              value: "East Mamprusi",
                            },
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
                          data={_switchDistrict(district)}
                          value={subdistrict}
                          onChangeText={(text) => setSubdistrict(text)}
                        />
                      </View>
                      <View>
                        <Text>CHPS zone</Text>
                        <Dropdown
                          label="Select CHPS"
                          data={_switchSubdistrict(subdistrict)}
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
                    loading={isLoading}
                  />
                </View>
              </>
            )}
          </>
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
    borderBottomColor: colors.primary,
    borderBottomWidth: 1 - 0.6,
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
