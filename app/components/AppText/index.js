import React from "react";
import { Text, View, Platform, StyleSheet } from "react-native";
// import defaultStyles from "../../config/styles";
function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 20,
        fontFamily: "Avenir",
      },
      android: {
        fontSize: 18,
        fontFamily: "Roboto",
      },
    }),
  },
});
