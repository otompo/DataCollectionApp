import React, { useEffect, useState } from "react";
import {
  Platform,
  AlertIOS,
  ToastAndroid
} from "react-native";

const _serveToast = (tMessage) => {
  if (Platform.OS === "android") {
    ToastAndroid.showWithGravityAndOffset(
      tMessage + " ",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  } else {
    AlertIOS.alert("Error: " + tMessage + " ");
  }
};

export default _serveToast;
