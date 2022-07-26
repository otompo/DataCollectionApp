import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, SafeAreaView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import SubmitButton from "../components/Button/SubmitButton";
import colors from "../config/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

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

  //   const handleSubmit= async()=>{
  //     try {
  //         setLoading(true)
  //         const {data}=await axios.post(``)
  //         setLoading(false)

  //     } catch (err) {
  //         console.log(err)
  //         setLoading(false)
  //     }
  //   }

  const handleScanned = ({ type, data }) => {
    setScannedData(data);
    if (data) {
      navigation.navigate("ResponseScanner", data);
      setShowScanner(false);
      setScanned(true);
      setScannedData("");
      setScanned(false);
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
          {showScanner ? (
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
                  height: 400,
                  width: 400,
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
                  <MaterialCommunityIcons
                    color={colors.white}
                    name="magnify-scan"
                    size={100}
                  />
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
              {/* <View style={styles.submitButtonContainer}>
                <SubmitButton
                  title="Submit"
                    onPress={handleSubmit}
                  loading={loading}
                  bwidth={160}
                />
              </View> */}
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
});
