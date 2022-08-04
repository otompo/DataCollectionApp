import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Divider } from "@ui-kitten/components";

function FormListItem({
  title,
  image,
  subTitle,
  subSubTitle,
  onPress,
  IconComponent,
  renderRightActions,
  icon = "chevron-right",
  size,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
          <View style={styles.container}>
            {IconComponent}
            {image && <Image style={styles.image} source={image} />}

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
                  {subSubTitle}
                </AppText>
              )}
            </View>
            <MaterialCommunityIcons
              name={icon}
              size={25}
              color={colors.medium}
            />
          </View>
        </TouchableHighlight>
        <Divider width={2} />
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default FormListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    // marginBottom: 5,
    marginTop: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: colors.secoundary,
    // marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.medium,
  },
  subTitle: {
    color: colors.medium,
    fontSize: 12,
  },
  subSubTitle: {
    color: colors.primary,
    fontSize: 12,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
});
