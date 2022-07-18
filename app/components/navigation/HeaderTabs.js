import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import colors from "../../config/colors";

function HeaderTabs({ icon, name, onPress }) {
  return (
    <SafeAreaView>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.nameText}>
          <FontAwesome name={icon} size={25} color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: 18
            }}
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HeaderTabs;

const styles = StyleSheet.create({
  badgeStyle: {
    elevation: 6,
    position: "absolute",
    bottom: 13,
    left: 20,
  },
  iconContainer: {
    marginLeft: 30,
  },
  nameText: {
    flexDirection: "row",
    marginLeft: 10
  },
});
