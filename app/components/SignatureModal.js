import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Signature from "react-native-signature-canvas";
import * as FileSystem from "expo-file-system";

const SignatureModal = ({ open, close }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const style = `.m-signature-pad--footer
    .button {
      background-color: red;
      color: #FFF;
    }`;

  const handleOK = (signature) => {
    const path = FileSystem.cacheDirectory + "sign.png";
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(path=>close(path))
      .catch(console.error);
  };

  const handleEmpty = () => {
    console.log("Empty");
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          close(signature);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Signature
              onOK={handleOK}
              onEmpty={handleEmpty}
              descriptionText="Sign"
              clearText="Clear"
              confirmText="Save"
              webStyle={style}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SignatureModal;
