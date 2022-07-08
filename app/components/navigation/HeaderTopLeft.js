import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import colors from "../../config/colors";

function HeaderTopLeft() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.img} />
    </View>
  );
}

export default HeaderTopLeft;

const styles = StyleSheet.create({
  img: {
    width: 90,
    height: 30,
  },
  container: {
    marginVertical: 5,
    width: 80,
    height: 25,
    flexDirection: "row",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
    marginTop: 10,
  },
});
