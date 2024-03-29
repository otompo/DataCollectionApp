import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  SafeAreaView,
  Platform,
  AlertIOS,
  ToastAndroid,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { BarCodeScanner } from "expo-barcode-scanner";
import AppText from "../components/Auth/AppText";
import colors from "../config/colors";

function QRCodeScanner({ navigation }) {
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState("");
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    askPermissions();
  }, []);

  const askPermissions = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setShowScanner(status == "granted");
    })();
  };

  const handleScanned = async ({ type, data }) => {
    try {
      setScannedData(data);
      const relData = JSON.parse(data);
      if (relData) {
        navigation.navigate("ResponseScanner", relData);
      } else {
        setShowScanner(false);
        setScanned(true);
        setScannedData("");
        setScanned(false);
      }
      setShowScanner(false);
      setScanned(true);
      setScannedData("");
      setScanned(false);
    } catch (error) {
      console.log(error);
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "Not applicable, use kpododo QR Codes",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("Not applicable, use kpododo QR Codes");
      }
    }
  };

  const handleClose = () => {
    setShowScanner(false);
    setScanned(false);
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
                Scan subscribers QR Code
              </AppText>
          {showScanner ? (
            <View
              style={{
                marginHorizontal: 10,
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
              <Pressable style={styles.sbutton} onPress={askPermissions}>
                <Text style={styles.text}>
                  <Icon name="qrcode" color={colors.white} size={100} />
                </Text>
              </Pressable>
            </View>
          )}

          {scanned && (
            <>
              <View style={styles.dataContainer}>
                <Text
                  style={{ fontSize: 18, fontWeight: "400", paddingBottom: 20 }}
                >
                  Scanned Data
                </Text>
                <Text>{scannedData}</Text>
              </View>
            </>
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
    borderRadius: 100,
    height: 40,
    width: 40,
    elevation: 3,
    backgroundColor: colors.danger,
    marginLeft: 290,
    marginTop: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
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
    marginTop: 10,
    textAlign: "center",
  },
});
