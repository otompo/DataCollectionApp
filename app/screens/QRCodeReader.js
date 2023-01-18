//import React, { useState } from "react";
//import { View, Text } from "react-native";
//import { Camera } from "expo-camera";
//import * as Permissions from "expo-permissions";
//
//export default function QRCodeReader() {
//  const [hasPermission, setHasPermission] = useState(null);
//  const [scanned, setScanned] = useState(false);
//
//  useEffect(() => {
//    (async () => {
//      const { status } = await Permissions.askAsync(Permissions.CAMERA);
//      setHasPermission(status === "granted");
//    })();
//  }, []);
//
//  if (hasPermission === null) {
//    return <Text>Requesting for camera permission</Text>;
//  }
//  if (hasPermission === false) {
//    return <Text>No access to camera</Text>;
//  }
//
//  return (
//    <View style={{ flex: 1 }}>
//      <Camera
//        style={{ flex: 1 }}
//        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//      >
//        {scanned && (
//          <Button
//            title={"Tap to Scan Again"}
//            onPress={() => setScanned(false)}
//          />
//        )}
//      </Camera>
//    </View>
//  );
//
//  async function handleBarCodeScanned({ type, data }) {
//    setScanned(true);
//
//    try {
//      const response = await fetch("https://your-api.com/qr-code", {
//        method: "POST",
//        headers: {
//          "Content-Type": "application/json",
//        },
//        body: JSON.stringify({
//          type,
//          data,
//        }),
//      });
//      const result = await response.json();
//      console.log(result);
//    } catch (error) {
//      console.error(error);
//    }
//  }
//}
