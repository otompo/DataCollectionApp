import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import colors from "../../config/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Video } from "expo-av";
import { Slider } from "react-native-range-slider-expo";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Rating } from "react-native-ratings";
import { Checkbox, RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SignatureModal from "../SignatureModal";

export const UserTextInput = ({
  name,
  pos,
  desc,
  type,
  value,
  onChange,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
  questionMandatoryOption,
  errors,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.light}
        style={{
          borderBottomWidth: 0.5,
          fontSize: 18,
          height: 40,
          borderBottomColor: colors.dark,
          borderRadius: 2,
          fontFamily: "Roboto",
        }}
        value={value}
        onChangeText={onChange}
      />
      <View>
        <Text semi size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserNoteInput = ({
  name,
  pos,
  desc,
  type,
  value,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "2" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <AutoGrowingTextInput
        style={{
          borderBottomWidth: 0.5,
          fontSize: 18,
          height: 40,
          borderBottomColor: colors.dark,
          borderRadius: 2,
          fontFamily: "Roboto",
          padding: 10,
        }}
        value={value}
        onChangeText={onChange}
        // placeholder={"Your Message"}
      />
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserPhoneInput = ({
  name,
  pos,
  desc,
  type,
  value,
  onChange,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
  questionMandatoryOption,
  errors,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>

      <TextInput
        autoCorrect={false}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.light}
        style={{
          borderBottomWidth: 0.5,
          fontSize: 18,
          height: 40,
          borderBottomColor: colors.dark,
          borderRadius: 2,
          fontFamily: "Roboto",
        }}
        value={value}
        onChangeText={onChange}
      />
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserDateInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  onChange,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
  questionMandatoryOption,
  errors,
}) => {
  const [date, setDate] = useState(new Date());

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  React.useEffect(() => {
    setFieldValue(id, getDate());
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setFieldValue(id, getDate(date));
    setDate(date);
    hideDatePicker();
  };

  const getDate = (dd = date) => {
    let tempDate = dd.toString().split(" ");
    return dd !== ""
      ? `${tempDate[0]} ${tempDate[1]} ${tempDate[2]} ${tempDate[3]}`
      : "";
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.light}
          style={{
            borderBottomWidth: 0.5,
            height: 50,
            width: "80%",
            borderRadius: 2,
            fontSize: 18,
            borderBottomColor: colors.dark,
            borderRadius: 2,
            fontFamily: "Roboto",
          }}
          value={getDate()}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text style={styles.text}>Date</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text size={12} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export const UserTimeInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  onChange,
  autoCapitalize = "none",
  keyboardType = "default",
  secureTextEntry = false,
  questionMandatoryOption,
  errors,
}) => {
  const [time, setTime] = useState(new Date());
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  React.useEffect(() => {
    setFieldValue(id, getTime());
  }, []);

  const handleTimeConfirm = (time) => {
    setFieldValue(id, getTime(time));
    setTime(time);
    hideTimePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const getTime = (tt = time) => {
    let tempTime = new Date(tt);

    var hours = tempTime.getHours();
    var minutes = tempTime.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // let dateTimeString =
    //   "Hours: " +
    //   tempTime.getHours() +
    //   " | Minutes: " +
    //   tempTime.getMinutes() +
    //   " | Secounds " +
    //   tempTime.getSeconds();
    return hours + ":" + minutes + " " + ampm;
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          autoCorrect={false}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.light}
          style={{
            borderBottomWidth: 0.5,
            height: 50,
            width: "80%",
            borderRadius: 2,
            fontSize: 18,
            borderBottomColor: colors.dark,
            borderRadius: 2,
            fontFamily: "Roboto",
          }}
          value={getTime()}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
          <Text style={styles.text}>Time</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        // is24Hour
        locale="en_GB"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export const UserImageInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  const [image, setImage] = useState("");
  useEffect(() => {
    setFieldValue(id, image);
  }, [id, image]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted !== true) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    if (!result.cancelled) {
      setFieldValue(result.uri);
      setImage(result.uri);
    }
  };

  const handleRemoveImage = () => {
    if (!image) setImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.idButton}>
            <Text semi style={{ fontWeight: "bold", color: colors.white }}>
              {pos}
            </Text>
          </TouchableOpacity>

          <Text
            medium
            color={colors.medium}
            style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
          >
            {name}
          </Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}
        </View>

        <TouchableWithoutFeedback onPress={openCamera}>
          <View style={styles.mediaContainer}>
            <MaterialCommunityIcons
              color={colors.medium}
              name="image"
              size={40}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {image ? (
        <>
          <View style={styles.closeIcon}>
            <TouchableWithoutFeedback onPress={handleRemoveImage}>
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color={colors.danger}
              />
            </TouchableWithoutFeedback>
          </View>
          <Image
            source={{ uri: image }}
            value={image}
            onChange={onChange}
            style={styles.image}
          />
        </>
      ) : null}

      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserImageGeoTagInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  questionMandatoryOption,
}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFieldValue(id, location);
  }, [location]);

  const getLocation = async () => {
    try {
      setLoading(true);
      // const { granted } = await Permissions.askAsync(Permissions.LOCATION);
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const location = await Location.getLastKnownPositionAsync();
      //getCurrentPositionAsync({accuracy:16,timeInterval:10000})

      if (location) {
        const loc_str = JSON.stringify(location);
        setLocation(loc_str);
        setFieldValue(id, loc_str);
        alert(`Your Location have been picked successfully`);
        setLoading(false);
      } else {
        alert(
          `Unable to pick your location, please make sure you are not obstracted by any structure`
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.idButton}>
            <Text semi style={{ fontWeight: "bold", color: colors.white }}>
              {pos}
            </Text>
          </TouchableOpacity>

          <Text
            medium
            color={colors.medium}
            style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
          >
            {name}
          </Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}
        </View>
        <TouchableOpacity onPress={getLocation} style={styles.geoButton}>
          <Text style={styles.text}>
            {loading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <View>
                <MaterialCommunityIcons
                  color={colors.medium}
                  name="map-marker-plus"
                  size={40}
                />
              </View>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {location ? (
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Location recorded
        </Text>
      ) : null}
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserVideoInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  questionMandatoryOption,
}) => {
  const [video, setVideo] = useState("");

  const videoData = React.useRef(null);
  const [status, setStatus] = React.useState({});

  useEffect(() => {
    setFieldValue(id, video);
  }, [id, video]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted !== true) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
    });
    // Explore the result
    if (!result.cancelled) {
      setFieldValue(result.uri);
      setVideo(result.uri);
    }
  };

  const handleRemoveVideo = () => {
    if (!video) setVideo();
    else
      Alert.alert("Delete", "Are you sure you want to delete this video?", [
        { text: "Yes", onPress: () => setVideo(null) },
        { text: "No" },
      ]);
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.idButton}>
            <Text semi style={{ fontWeight: "bold", color: colors.white }}>
              {pos}
            </Text>
          </TouchableOpacity>

          <Text
            medium
            color={colors.medium}
            style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
          >
            {name}
          </Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}
        </View>

        <TouchableWithoutFeedback onPress={openCamera}>
          <View style={styles.mediaContainer}>
            <MaterialCommunityIcons
              color={colors.medium}
              name="video"
              size={40}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {video ? (
        <>
          <View style={styles.closeVideoIcon}>
            <TouchableWithoutFeedback onPress={handleRemoveVideo}>
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color={colors.danger}
              />
            </TouchableWithoutFeedback>
          </View>
          <Video
            ref={videoData}
            style={styles.media}
            source={{ uri: video }}
            useNativeControls
            resizeMode="contain"
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        </>
      ) : null}

      <View>
        <Text size={12} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserSingleSelectInput = ({
  name,
  pos,
  desc,
  type,
  id,
  questionsDetail,
  questionMandatoryOption,
  setFieldValue,
  errors,
}) => {
  const [checked, setChecked] = useState("");

  useEffect(() => {
    setFieldValue(id, checked);
  }, [id, checked]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View>
        {questionsDetail.options.map((item) => (
          <>
            <View style={{ marginBottom: 0.1, flexDirection: "row"}}>
              <RadioButton
                value={item}
                status={checked === item ? "checked" : "unchecked"}
                onPress={() => setChecked(item)}
              />
              <Text style={{ marginTop: 8 }}>{item}</Text>
            </View>
          </>
        ))}
      </View>
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserMultySelectInput = ({
  name,
  pos,
  desc,
  type,
  setFieldValue,
  questionMandatoryOption,
  questionsDetail,
  errors,
}) => {
  const [check, setCheck] = useState(Array());

  const setSelected = (item) => {
    const flt = check.indexOf(item);
    if (flt > -1) {
      //it already selected so remove from selections
      setCheck(check.filter((it) => it !== item));
    } else {
      setCheck([...check, item]);
    }

    setFieldValue(questionsDetail.questionId, [...check, item]);
  };

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>
        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <View>
        {questionsDetail.options.map((item) => (
          <View
            style={{
              marginVertical: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              style={{ marginRight: 10 }}
              status={check?.includes(item) ? "checked" : "unchecked"}
              onPress={() => {
                setSelected(item);
              }}
            />
            <Text>{item}</Text>
          </View>
        ))}
      </View>
      <View>
        <Text size={10} style={{ marginBottom: 2 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserSliderScaletInput = ({
  name,
  pos,
  desc,
  type,
  id,
  questionMandatoryOption,
  setFieldValue,
  maximum,
  minimum,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setFieldValue(id, value);
  }, [id, value]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <Slider
        min={minimum}
        max={maximum}
        step={1}
        valueOnChange={(value) => setValue(value)}
        initialValue={minimum}
        knobColor={colors.primary}
        valueLabelsBackgroundColor={colors.primary}
        outOfRangeBarColor={colors.primary}
      />
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserLikertScaletInput = ({
  name,
  pos,
  desc,
  type,
  id,
  questionMandatoryOption,
  setFieldValue,
  likerValue,
  errors,
}) => {
  const [option, setOption] = useState("");

  useEffect(() => {
    setFieldValue(id, option);
  }, [id, option]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.idButton}>
          <Text semi style={{ fontWeight: "bold", color: colors.white }}>
            {pos}
          </Text>
        </TouchableOpacity>

        <Text
          medium
          color={colors.medium}
          style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
        >
          {name}
        </Text>

        {questionMandatoryOption === "1" ? (
          <Text
            semi
            color={colors.danger}
            style={{ marginLeft: 3, fontSize: 16 }}
          >
            *
          </Text>
        ) : null}
      </View>
      <ScrollView>
        {likerValue.map((item) => (
          <>
            <Pressable onPress={() => setOption(item)}>
              <View style={{ marginVertical: 15 }}>
                <Text
                  style={[
                    styles.scaleText,
                    item === option ? styles.selected : styles.unselected,
                  ]}
                >
                  {item}
                </Text>
              </View>
            </Pressable>
          </>
        ))}
      </ScrollView>
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserBarQRCodeInput = ({
  name,
  pos,
  desc,
  type,
  id,
  questionMandatoryOption,
  setFieldValue,
  errors,
}) => {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    setFieldValue(id, scannedData);
  }, [id, scannedData]);

  const askPermissions = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setShowScanner(status == "granted");
    })();
  };

  const handleScanned = ({ type, data }) => {
    setScannedData(data);
    setScanned(true);
    setShowScanner(false);
    alert(`Code with type ${type} and data ${data} has been scanned!`);
  };

  const handleClose = () => {
    setShowScanner(false);
    setScanned(false);
  };

  if (showScanner) {
    return (
      <View
        style={{
          marginHorizontal: 24,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable style={styles.cbutton} onPress={handleClose}>
          <Text style={styles.text}>Close</Text>
        </Pressable>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleScanned}
          style={{
            height: 300,
            width: 300,
            flexDirection: "column",
            justifyContent: "center",
          }}
        />
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.idButton}>
            <Text semi style={{ fontWeight: "bold", color: colors.white }}>
              {pos}
            </Text>
          </TouchableOpacity>

          <Text
            medium
            color={colors.medium}
            style={{ marginBottom: 5, marginRight: 15, fontWeight: "bold" }}
          >
            {name}
          </Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}
        </View>

        <Pressable style={styles.sbutton} onPress={askPermissions}>
          <Text style={styles.text}>
            <MaterialCommunityIcons
              color={colors.white}
              name="magnify-scan"
              size={40}
            />
          </Text>
        </Pressable>
      </View>
      {scannedData ? (
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Code captured</Text>
      ) : null}
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserRatingInput = ({
  name,
  pos,
  desc,
  type,
  id,
  questionMandatoryOption,
  setFieldValue,
}) => {
  const [rating, setRating] = useState("");

  useEffect(() => {
    setFieldValue(id, rating);
  }, [id, rating]);

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  return (
    <View style={{ marginHorizontal: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.idButton}>
            <Text semi style={{ fontWeight: "bold", color: colors.white }}>
              {pos}
            </Text>
          </TouchableOpacity>

          <Text
            medium
            color={colors.medium}
            style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
          >
            {name}
          </Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}
        </View>
        <Rating
          onFinishRating={ratingCompleted}
          minValue={1}
          ratingBackgroundColor={colors.light}
          style={{ paddingVertical: 10 }}
        />
      </View>
      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

export const UserSectionBreakInput = ({ name }) => {
  return (
    <View style={{ marginHorizontal: 24, paddingVertical: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          center
          medium
          color={colors.dark}
          style={{ fontWeight: "bold", fontFamily: "Roboto" }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export const UserIntroductoryInput = ({ name, desc }) => {
  return (
    <View style={{ marginHorizontal: 24, paddingVertical: 1 }}>
      <Text
        color={colors.dark}
        style={{
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Roboto",
        }}
      >
        {name}
      </Text>
      <Text color={colors.medium} style={{ fontFamily: "Roboto" }}>
        {desc}
      </Text>
    </View>
  );
};

export const UserSignatureCaptureInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFieldValue(id, image);
  }, [id, image]);

  const opneModal = () => {
    setOpen(true);
  };

  const handleRemoveImage = () => {
    if (!image) setImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <Text
        color={colors.primary}
        style={{ textTransform: "uppercase", marginBottom: 7 }}
      >
        {type}
      </Text>

      <View style={styles.imageContainer}>
        <>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.idButton}>
              <Text semi style={{ fontWeight: "bold", color: colors.white }}>
                {pos}
              </Text>
            </TouchableOpacity>

            <Text
              medium
              color={colors.medium}
              style={{ marginBottom: 5, marginLeft: 10, fontWeight: "bold" }}
            >
              {name}
            </Text>

            {questionMandatoryOption === "1" ? (
              <Text
                semi
                color={colors.danger}
                style={{ marginLeft: 3, fontSize: 16 }}
              >
                *
              </Text>
            ) : null}
          </View>

          <TouchableWithoutFeedback onPress={opneModal}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="signature-freehand"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        </>
      </View>

      {image ? (
        <View>
          <View style={[styles.closeIcon, { marginLeft: 150 }]}>
            <TouchableWithoutFeedback onPress={handleRemoveImage}>
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color={colors.danger}
              />
            </TouchableWithoutFeedback>
          </View>
          <Image
            source={{ uri: image }}
            value={image}
            onChange={onChange}
            style={{ width: 150, height: 150 }}
          />
        </View>
      ) : null}

      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>

      <SignatureModal
        open={open}
        close={(signature) => {
          setOpen(false);
          setImage(signature.uri);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 55,
    height: 55,
    marginVertical: 10,
  },

  geoButton: {
    // backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    marginVertical: 10,
  },
  idButton: {
    color: colors.light,
    backgroundColor: colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    width: 25,
    height: 25,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "bold",
  },
  mediaContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#9e9e9e",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  closeIcon: {
    //position: "absolute",
    zIndex: 3,
    marginLeft: 200,
  },
  closeVideoIcon: {
    //position: "absolute",
    zIndex: 3,
    marginLeft: 250,
    //bottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 200,
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 10,
    borderColor: colors.white,
    resizeMode: "cover",
  },
  media: {
    width: 300,
    height: 250,
    borderWidth: 5,
    borderRadius: 10,
    marginRight: -40,
    borderColor: colors.white,
    resizeMode: "cover",
  },
  unselected: {
    color: colors.medium,
  },
  selected: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 10,
  },
  scaleText: {
    marginRight: 20,
  },
  scannerbuttons: {
    marginVertical: 10,
    backgroundColor: colors.primary,
  },
  cbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 40,
    width: 40,
    elevation: 3,
    backgroundColor: colors.danger,
    marginLeft: 70,
  },
  sbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 55,
    width: 55,
    elevation: 3,
    backgroundColor: colors.primary,
    marginTop: -10,
    marginHorizontal: -20,
    marginBottom: 20,
    // marginLeft: 90,
  },
  preview: {
    width: 335,
    height: 114,
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  previewText: {
    color: "#FFF",
    fontSize: 14,
    height: 40,
    lineHeight: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#69B2FF",
    width: 120,
    textAlign: "center",
    marginTop: 10,
  },
});
