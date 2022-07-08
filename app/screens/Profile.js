import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../config/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Text from "@kaloraat/react-native-text";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import SubmitButton from "../components/Button/SubmitButton";
import AppTextInput from "../components/Auth/AppTextInput";
import CircleLogo from "../components/Auth/CircleLogo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
// import { Avatar } from "react-native-paper";
// import ListItem from "../components/ListItem";
// import moment from "moment";

function HistoryScreen({ navigation }) {
  return (
    <View>
      <Text>History</Text>
    </View>
  );
}

function AccountScreen({ navigation }) {
  const [state, setState] = useContext(AuthContext);
  const [uploadImage, setUploadImage] = useState("");
  const [full_name, setFullName] = useState("");
  const [userId, setUserId] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const user_id = state?.user_id || state?.user?.user_id;
  const [image, setImage] = useState({});

  useEffect(() => {
    if (state.user) {
      const { full_name, phone_number } = state && state.user;
      setFullName(full_name);
      setPhone_Number(phone_number);
      // setUserId(user_id);
      // setImage(profle_image);
    }
    // if (state.user === null) navigation.navigate("Signin");
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://beta.kpododo.com/api/v1/changeprofile?user_id=${user_id}&full_name=${full_name}`
      );

      const as = JSON.parse(await AsyncStorage.getItem("@auth"));

      as.user = data;
      const prepData = { user: data, status: true };
      await AsyncStorage.setItem("@auth", JSON.stringify(prepData));
      setState(prepData);
      // update  constext
      setState({ ...state, user: data });
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
      // alert(err);
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    // console.log(permissionResult);
    if (permissionResult.granted !== true) {
      alert("Camera access is required");
      return;
    }
    // get image from user
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    // console.log(pickeResult);
    if (!pickerResult.cancelled) {
      let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
      // save image to state for preview
      // console.log(base64Image);
      setUploadImage(base64Image);
      // send to backend for uploading to clouldnary

      const { data } = await axios.post(`/api/upload-image`, {
        image: base64Image,
      });
      // console.log(data);
      // update user async storage
      const as = JSON.parse(await AsyncStorage.getItem("@auth"));
      // it has {user:{}, token}
      as.user = data;
      // console.log("UPDATED DATA", data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      // update  constext
      setState({ ...state, user: data });
      setImage(data.image);
      alert("Profile image saved successfully");
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true}
      extraHeight={80}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 5,
      }}
    >
      <ScrollView>
        <CircleLogo>
          {image && image.url ? (
            <Image
              source={{ uri: image.url }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : uploadImage ? (
            <Image
              source={{ uri: uploadImage }}
              style={{
                height: 150,
                width: 150,
                borderRadius: 100,
                marginVertical: 20,
              }}
            />
          ) : (
            <TouchableOpacity onPress={() => handleUpload()}>
              <MaterialCommunityIcons name="camera" size={40} color="orange" />
            </TouchableOpacity>
          )}
        </CircleLogo>
        <Text medium center style={{ paddingBottom: -25 }}>
          {phone_number}
        </Text>
        <View style={{ marginHorizontal: 30 }}>
          <AppTextInput
            autoCapitalize="words"
            autoCorrect={false}
            icon="account"
            placeholder="Enter your full name"
            value={full_name}
            setValue={setFullName}
          />

          <SubmitButton
            title="Update"
            onPress={handleSubmit}
            loading={loading}
          />
        </View>
        {/* <Text>{JSON.stringify(state, null, 2)}</Text> */}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}

function PasswordScreen() {
  const [state, setState] = useContext(AuthContext);
  const [c_password, setC_Password] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (state) {
      const { user_id } = state && state.user;
      setUserId(user_id);
    }
  }, [state]);

  const handlePasswordUpdate = async () => {
    try {
      setLoading(true);
      if (!oldpassword || !newpassword || !c_password) {
        alert("All fields are require");
        setLoading(false);
        return;
      }
      const { data } = await axios.get(
        `/changepassword?user_id=${userId}&oldpassword=${oldpassword}&newpassword=${newpassword}`
      );

      setOldPassword("");
      setNewPassword("");
      setC_Password("");
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
      alert(err);
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={100}
      enableOnAndroid={true}
      extraHeight={80}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        marginHorizontal: 5,
      }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerLine}>
          <Text
            title
            center
            bold
            style={{
              textTransform: "uppercase",
              textDecorationLine: "underline",
            }}
          >
            Update Password
          </Text>
        </View>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={oldpassword.toString()}
          setValue={setOldPassword}
          placeholder="Previous Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={newpassword.toString()}
          setValue={setNewPassword}
          placeholder="New Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          value={c_password.toString()}
          setValue={setC_Password}
          placeholder="Confirm Password..."
          secureTextEntry
          textContentType="password"
          autoCompleteType="password"
        />

        <SubmitButton
          title="Update"
          onPress={handlePasswordUpdate}
          loading={loading}
        />
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
const TopTabNavigator = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTabNavigator.Navigator
      initialRouteName="History"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: {
          fontSize: 12,
          color: colors.white,
        },
        tabBarStyle: { backgroundColor: colors.secoundary },
      }}
    >
      <TopTabNavigator.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="history"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Password"
        component={PasswordScreen}
        options={{
          tabBarLabel: "Password",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="lock"
              color={colors.white}
              size={26}
            />
          ),
        }}
      />
    </TopTabNavigator.Navigator>
  );
}

function Profile() {
  return <TopTabs />;
}
export default Profile;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  container: {
    marginTop: 15,
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 125,
    right: 110,
    elevation: 3,
  },
  headerLine: {
    margin: 20,
  },
});
