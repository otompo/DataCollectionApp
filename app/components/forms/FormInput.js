import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import colors from "../../config/colors";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { Slider } from "react-native-range-slider-expo";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Rating } from "react-native-ratings";
import { Divider } from "@ui-kitten/components";
import { Checkbox, RadioButton } from "react-native-paper";

export const UserTextInput = ({
  name,
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
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
        style={{
          borderBottomWidth: 0.5,
          height: 28,
          borderBottomColor: "#8e993a",
          borderRadius: 2,
        }}
        value={value}
        onChangeText={onChange}
      />

      {errors && (
        <Text style={{ fontSize: 10, marginBottom: 30, color: "red" }}>
          {errors}
        </Text>
      )}
    </View>
  );
};
export const UserNoteInput = ({
  name,
  value,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  return (
    <View style={{ marginHorizontal: 24 }}>
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
          height: 28,
          borderBottomColor: "#8e993a",
          borderRadius: 2,
          padding: 10,
        }}
        value={value}
        onChangeText={onChange}
        // placeholder={"Your Message"}
      />
      {errors && (
        <Text style={{ fontSize: 10, marginBottom: 30, color: "red" }}>
          {errors}
        </Text>
      )}
    </View>
  );
};

export const UserPhoneInput = ({
  name,
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
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
        style={{
          borderBottomWidth: 0.5,
          height: 28,
          borderBottomColor: "#8e993a",
          borderRadius: 2,
        }}
        value={value}
        onChangeText={onChange}
      />
      <View
        style={{
          marginBottom: 30,
        }}
      >
        {errors && <Text style={{ fontSize: 10, color: "red" }}>{errors}</Text>}
      </View>
    </View>
  );
};

export const UserDateInput = ({
  name,
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
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
          style={{
            borderBottomWidth: 0.5,
            height: 50,
            width: "80%",
            borderBottomColor: "#8e993a",
            borderRadius: 2,
          }}
          value={getDate()}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
          <Text style={styles.text}>Date</Text>
        </TouchableOpacity>
      </View>
      {errors && (
        <Text
          style={{
            fontSize: 10,
            marginBottom: 30,
            marginTop: -15,
            color: "red",
          }}
        >
          {errors}
        </Text>
      )}
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
    // console.log(time);
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
    // console.log(dateTimeString);
    return hours + ":" + minutes + " " + ampm;
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
          style={{
            borderBottomWidth: 0.5,
            height: 50,
            width: "80%",
            borderBottomColor: "#8e993a",
            borderRadius: 2,
          }}
          value={getTime()}
          onChangeText={onChange}
        />
        <TouchableOpacity onPress={showTimePicker} style={styles.dateButton}>
          <Text style={styles.text}>Time</Text>
        </TouchableOpacity>
      </View>
      {errors && (
        <Text
          style={{
            fontSize: 10,
            marginBottom: 30,
            marginTop: -15,
            color: "red",
          }}
        >
          {errors}
        </Text>
      )}
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
  id,
  setFieldValue,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  const [image, setImage] = useState("");
  // console.log(image);

  useEffect(() => {
    setFieldValue(id, image);
  }, [id, image]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });
    // Explore the result
    // console.log(result);
    if (!result.cancelled) {
      let base64Image = `data:image/jpg;base64,${result.base64}`;
      setFieldValue(base64Image);
      setImage(base64Image);
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
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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
        ) : (
          <TouchableWithoutFeedback onPress={openCamera}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="image"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
      {errors && (
        <Text
          style={{
            fontSize: 10,
            marginBottom: 20,
            marginTop: -15,
            color: "red",
          }}
        >
          {errors}
        </Text>
      )}
    </View>
  );
};

export const UserImageGeoTagInput = ({
  name,
  id,
  setFieldValue,
  onChange,
  questionMandatoryOption,
}) => {
  const [image, setImage] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  // console.log(location);

  useEffect(() => {
    setFieldValue(id, image, location);
  }, [image, location]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    // console.log(result);
    if (!result.cancelled) {
      setFieldValue(result.uri);
      setImage(result.uri);
      getLocation();
    }
  };

  const handlePress = () => {
    if (!image) setImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => setImage(null) },
        { text: "No" },
      ]);
  };

  const getLocation = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude });
      setFieldValue({ latitude, longitude });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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
        {image ? (
          <>
            <View style={styles.closeIcon}>
              <TouchableWithoutFeedback onPress={handlePress}>
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
        ) : (
          <TouchableWithoutFeedback onPress={openCamera}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="camera"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export const UserVideoInput = ({
  name,
  id,
  setFieldValue,
  questionMandatoryOption,
}) => {
  const [video, setVideo] = useState("");

  const videoData = React.useRef(null);
  const [status, setStatus] = React.useState({});
  // console.log(location);

  useEffect(() => {
    setFieldValue(id, video);
  }, [id, video]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
    });
    // Explore the result
    // console.log(result);
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
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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

            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={() =>
                  status.isPlaying
                    ? videoData.current.pauseAsync()
                    : videoData.current.playAsync()
                }
              />
            </View>

            {/* <Image
              source={{ uri: video }}
              value={video}
              onChange={onChange}
              style={styles.video}
            /> */}
          </>
        ) : (
          <TouchableWithoutFeedback onPress={openCamera}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="video"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export const UserAudioInput = ({
  name,
  id,
  setFieldValue,
  questionMandatoryOption,
}) => {
  const [audio, setAudio] = useState("");
  const audioData = React.useRef(null);
  const [status, setStatus] = React.useState({});
  // console.log(audio);

  useEffect(() => {
    setFieldValue(id, audio);
  }, [id, audio]);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setAudio(result.uri);
    setFieldValue(result.uri);
  };

  const handleRemoveAudio = () => {
    if (!audio) setAudio();
    else
      Alert.alert("Delete", "Are you sure you want to delete this audio?", [
        { text: "Yes", onPress: () => setAudio(null) },
        { text: "No" },
      ]);
  };

  return (
    <View style={{ marginLeft: 24 }}>
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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
        {audio ? (
          <>
            <View style={styles.closeVideoIcon}>
              <TouchableWithoutFeedback onPress={handleRemoveAudio}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={25}
                  color={colors.danger}
                />
              </TouchableWithoutFeedback>
            </View>
            <Video
              ref={audioData}
              style={styles.media}
              source={{ uri: audio }}
              useNativeControls
              resizeMode="contain"
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />

            <View style={styles.buttons}>
              <Button
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={() =>
                  status.isPlaying
                    ? audioData.current.pauseAsync()
                    : audioData.current.playAsync()
                }
              />
            </View>
          </>
        ) : (
          <TouchableWithoutFeedback onPress={pickDocument}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="volume-high"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    </View>
  );
};

export const UserSingleSelectInput = ({
  name,
  id,
  questionsDetail,
  questionMandatoryOption,
  setFieldValue,
  errors,
}) => {
  const [checked, setChecked] = useState("");
  // console.log(option);

  useEffect(() => {
    setFieldValue(id, checked);
  }, [id, checked]);

  return (
    <View style={{ marginHorizontal: 24, marginBottom: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
            <View style={{ marginVertical: 5, flexDirection: "row" }}>
              <RadioButton
                value={item}
                status={checked === item ? "checked" : "unchecked"}
                onPress={() => setChecked(item)}
              />
              <Text style={{ marginTop: 10 }}>{item}</Text>
            </View>
          </>
        ))}
        <View
          style={{
            marginBottom: 30,
          }}
        >
          {errors && (
            <Text style={{ fontSize: 10, color: "red" }}>{errors}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export const UserMultySelectInput = ({
  name,
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
    <View style={{ marginHorizontal: 24, marginBottom: 20 }}>
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>
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
              marginVertical: 2,
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
        {errors && <Text style={{ fontSize: 10, color: "red" }}>{errors}</Text>}
      </View>
    </View>
  );
};

export const UserSliderScaletInput = ({
  name,
  id,
  questionMandatoryOption,
  setFieldValue,
  maximum,
  minimum,
}) => {
  const [value, setValue] = useState(0);
  // console.log(value);

  useEffect(() => {
    setFieldValue(id, value);
  }, [id, value]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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
          knobColor={colors.secoundary}
          valueLabelsBackgroundColor="black"
          inRangeBarColor={colors.close}
          outOfRangeBarColor={colors.secoundary}
        />
      </>
    </View>
  );
};

export const UserLikertScaletInput = ({
  name,
  id,
  questionMandatoryOption,
  setFieldValue,
  likerValue,
  errors,
}) => {
  const [option, setOption] = useState("");
  // console.log(likerValue);

  useEffect(() => {
    setFieldValue(id, option);
  }, [id, option]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <View style={{ flexDirection: "row" }}>
        <Text semi>{name}</Text>

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
      <ScrollView horizontal={true}>
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
      <View
        style={{
          marginBottom: 30,
        }}
      >
        {errors && <Text style={{ fontSize: 10, color: "red" }}>{errors}</Text>}
      </View>
    </View>
  );
};

export const UserBarQRCodeInput = ({
  name,
  id,
  questionMandatoryOption,
  setFieldValue,
  errors,
}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  // console.log(scannedData);
  useEffect(() => {
    setFieldValue(id, scannedData);
  }, [id, scannedData]);

  const askPermissions = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // setHasPermission(status == "granted");
      setShowScanner(status == "granted");
    })();
  };

  const handleScanned = ({ type, data }) => {
    setScannedData(data);
    setScanned(true);
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
          style={{ height: 150, width: 150 }}
        />
      </View>
    );
  }

  return (
    <View style={{ marginHorizontal: 24 }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text semi>{name}</Text>

          {questionMandatoryOption === "1" ? (
            <Text
              semi
              color={colors.danger}
              style={{ marginLeft: 3, fontSize: 16 }}
            >
              *
            </Text>
          ) : null}

          <Pressable style={styles.sbutton} onPress={askPermissions}>
            <Text style={styles.text}>Scan</Text>
          </Pressable>
        </View>
        {errors && (
          <Text
            style={{
              fontSize: 10,
              marginBottom: 20,
              marginTop: -15,
              color: "red",
            }}
          >
            {errors}
          </Text>
        )}
      </View>
    </View>
  );
};

export const UserRatingInput = ({
  name,
  id,
  questionMandatoryOption,
  setFieldValue,
}) => {
  const [rating, setRating] = useState("");
  // console.log(rating);
  useEffect(() => {
    setFieldValue(id, rating);
  }, [id, rating]);

  const ratingCompleted = (rating) => {
    setRating(rating);
  };

  return (
    <View style={{ marginHorizontal: 24 }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text semi>{name}</Text>

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
    </View>
  );
};

export const UserSectionBreakInput = ({
  name,
  id,
  questionMandatoryOption,
  questionBreakTitle,
}) => {
  // console.log(rating);
  // useEffect(() => {
  //   setFieldValue(id, rating);
  // }, [id, rating]);

  return (
    <View style={{ marginHorizontal: 24 }}>
      <View
        style={{
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text semi>{name}</Text>

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
        <View style={{ marginVertical: 10 }}>
          <Text>{questionBreakTitle}</Text>
          <Divider />
        </View>
      </View>
    </View>
  );
};

export const UserSignatureCaptureInput = ({
  name,
  id,
  setFieldValue,
  onChange,
  questionMandatoryOption,
  errors,
}) => {
  const [image, setImage] = useState("");
  // console.log(image);

  useEffect(() => {
    setFieldValue(id, image);
  }, [id, image]);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      base64: true,
    });
    // Explore the result
    // console.log(result);
    if (!result.cancelled) {
      let base64Image = `data:image/jpg;base64,${result.base64}`;
      setFieldValue(base64Image);
      setImage(base64Image);
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
      <View style={styles.imageContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text semi>{name}</Text>

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
        ) : (
          <TouchableWithoutFeedback onPress={openCamera}>
            <View style={styles.mediaContainer}>
              <MaterialCommunityIcons
                color={colors.medium}
                name="camera"
                size={40}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>

      {errors && (
        <Text
          style={{
            fontSize: 10,
            marginBottom: 20,
            marginTop: -15,
            color: "red",
          }}
        >
          {errors}
        </Text>
      )}
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
    position: "absolute",
    zIndex: 3,
    marginLeft: 300,
  },
  closeVideoIcon: {
    position: "absolute",
    zIndex: 3,
    marginLeft: 230,
    bottom: 30,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 20,
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 5,
    borderRadius: 10,
    marginTop: 10,
    borderColor: colors.white,
    resizeMode: "cover",
  },
  media: {
    width: 50,
    height: 50,
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
    color: colors.secoundary,
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
