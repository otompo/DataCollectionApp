import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Button,
  StyleSheet,
} from "react-native";
import Text from "@kaloraat/react-native-text";
import colors from "../../config/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Video, Audio } from "expo-av";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function convertMsToHM(milliseconds) {
  // console.log(milliseconds);
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = seconds >= 30 ? minutes + 1 : minutes;

  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

export const UserAudioInput = ({
  name,
  pos,
  desc,
  type,
  id,
  setFieldValue,
  questionMandatoryOption,
}) => {
  const [audio, setAudio] = useState(null);
  const sound = React.useRef(new Audio.Sound());
  const [status, setStatus] = React.useState({});
  const [recording, setRecording] = React.useState(null);
  const [recordedMedia, setRecordedMedia] = React.useState(null);
  const [recorderStatus, setRecorderStatus] = React.useState(null);
  const [timer, setTimer] = React.useState("00:00:00");
  const [preparing, setPreparing] = React.useState(false);

  useEffect(() => {
    setFieldValue(id, recordedMedia);
  }, [recordedMedia]);

  async function startRecording() {
    setPreparing(true);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.setOnRecordingStatusUpdate((status) => {
        setRecorderStatus(status);
      });
      setRecording(recording);
      setPreparing(false);
    } catch (err) {
      Alert.alert("Failed to start recording:", err);
      console.error("Failed to start recording", err);
    } finally {
      setPreparing(false);
    }
  }

  async function stopRecording() {
    setRecording(recording);
    await recording.stopAndUnloadAsync();
    setRecordedMedia(recording.getURI());
    const { sound, status } = await recording.createNewLoadedSoundAsync(
      {},
      (status) => {
        setStatus(status);
      }
    );
    setAudio(sound);
    sound.playAsync();
    //setRecordedMedia(recording.getURI())
    // console.log("Recording stopped and stored at", recording.getURI());
  }

  //    async function pauseRecording() {
  //        await recording.pauseAsync
  //    }

  const handleRemoveAudio = () => {
    if (!recordedMedia) setRecordedMedia();
    else
      Alert.alert("Delete", "Are you sure you want to delete this audio?", [
        {
          text: "Yes",
          onPress: () => {
            setRecordedMedia(null);
            setFieldValue(id, "");
          },
        },
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

        <TouchableWithoutFeedback onPress={startRecording}>
          <View style={styles.mediaContainer}>
            <MaterialCommunityIcons
              color={colors.medium}
              name={"volume-high"}
              size={40}
            />
          </View>
        </TouchableWithoutFeedback>

        {recordedMedia && (
          <View style={styles.closeVideoIcon}>
            <TouchableWithoutFeedback onPress={handleRemoveAudio}>
              <MaterialCommunityIcons
                name="close-circle"
                size={25}
                color={colors.danger}
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
      {preparing && <Text>preparing recorder...</Text>}
      {recordedMedia && status?.isLoaded && (
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Playing Sound
          </Text>
          <Text>{convertMsToHM(parseInt(status.positionMillis)) || timer}</Text>
          {status?.isPlaying ? (
            <Icon
              size={35}
              name="pause"
              color="yellow"
              onPress={() => audio.pauseAsync()}
            />
          ) : (
            <Icon
              size={35}
              name="play"
              color="green"
              onPress={() => audio.playAsync()}
            />
          )}
        </View>
      )}

      {recorderStatus?.isRecording && (
        <View>
          <Text style={{ fontWeight: "bold" }}>
            {convertMsToHM(parseInt(status.durationMillis)) || timer}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon size={30} name="stop" color="red" onPress={stopRecording} />
          </View>
        </View>
      )}

      <View>
        <Text size={10} style={{ marginBottom: 5 }}>
          <Icon name="alert-circle-outline" color={colors.primary} /> {desc}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
