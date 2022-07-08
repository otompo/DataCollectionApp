import React from "react";
import { Text, Platform, StyleSheet } from "react-native";
import defaultStyles from "../../config/styles";
function AppText({ children, style, ...otherProps }) {
  return (
    <Text style={[defaultStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
}

export default AppText;
const styles = StyleSheet.create({
  text: {
    color: "tomato",

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
