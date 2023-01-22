import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarCodeScanner } from "expo-barcode-scanner";
import AppText from "../components/Auth/AppText";
import colors from "../config/colors";
import _serveToast from "../utils/_serveToast";

function QRCodeScanner({ navigation }) {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setShowScanner(status === "granted");
    })();
  };

  const handleScanned = ({ type, data }) => {
    try {
      const qrcodeData = JSON.parse(data);

      if (qrcodeData) {
        setScannedData("");
        setScanned(false);
        setShowScanner(false);

        navigation.navigate("ResponseScanner", qrcodeData);
      } else {
        _serveToast("Invalid QR code data");
      }
    } catch (error) {
      _serveToast("Not applicable, use kpododo QR Codes");
    }
    setScannedData("");
    setScanned(false);
    setShowScanner(false);
  };

  const handleClose = () => {
    setShowScanner(false);
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{ flexGrow: 1 }} // make the scrollView full screen
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <>
          <AppText center style={styles.title}>
            Tap to Scan subscribers QRCode
          </AppText>
          {showScanner ? (
            <View
              style={{
                marginHorizontal: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.cbutton} onPress={handleClose}>
                <Text style={styles.text}>Close Camera</Text>
              </TouchableOpacity>

              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleScanned}
                style={{
                  height: 500,
                  width: 500,
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              />
            </View>
          ) : (
            <View
              style={{
                marginHorizontal: 24,
                marginVertical: 60,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity style={styles.sbutton} onPress={askPermissions}>
                <Text>
                  <Icon name="qrcode" color={colors.white} size={100} />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

export default QRCodeScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
  },
  cbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 30,
    padding: 5,
    elevation: 3,
    backgroundColor: colors.danger,
    marginLeft: 290,
    marginVertical: 5,
  },
  text: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  submitButtonContainer: {
    marginHorizontal: 30,
  },
  sbutton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 150,
    width: 150,
    elevation: 3,
    backgroundColor: colors.primary,
    marginTop: -10,
    marginHorizontal: -20,
    marginBottom: 20,
    // marginLeft: 90,
  },
  dataContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
  },
  title: {
    color: colors.black,
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
});
