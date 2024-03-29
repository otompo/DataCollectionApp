import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import NetInfo from "@react-native-community/netinfo";
import { FontAwesome } from "@expo/vector-icons";

function ListItem({
  title,
  image,
  subTitle,
  subSubTitle,
  onPress,
  icon = "chevron-right",
  icons,
  iconc,
  oncono,
  offcono,
}) {
  const [networkConnection, setNetworkConnection] = useState(Boolean);
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnection(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
      <View style={styles.container}>
        {/* {image && <Image style={styles.image} source={image} />} */}
        <View style={styles.image}>
          <FontAwesome name="user" size={40} color={colors.white} />
        </View>

        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
          {subSubTitle && (
            <AppText style={styles.subSubTitle} numberOfLines={2}>
              {networkConnection ? (
                <FontAwesome name={oncono} size={12} color={colors.green} />
              ) : (
                <FontAwesome name={offcono} size={12} color={colors.light} />
              )}
              {subSubTitle}
            </AppText>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    // backgroundColor: colors.white,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: colors.secoundary,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  title: {
    color: colors.white,
    marginVertical: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.white,
    fontSize: 16,
  },
  subSubTitle: {
    color: colors.white,
    fontSize: 12,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
});
