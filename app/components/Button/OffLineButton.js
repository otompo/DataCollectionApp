import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";

function OffLineButton({
  title,
  loading,
  handlePress,
  disabled,
  bwidth = "100%",
  bcolor = "secondary",
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={disabled ? 0.5 : 1}
      style={[
        styles.button,
        { backgroundColor: colors[bcolor], width: bwidth },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{loading ? "Please wait..." : title}</Text>
    </TouchableOpacity>
  );
}

export default OffLineButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
