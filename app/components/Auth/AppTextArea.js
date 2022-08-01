import React from "react";
import { View, StyleSheet } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import defaultStyles from "../../config/styles";
import colors from "../../config/colors";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";

function AppTextArea({
  icon,
  placeholder,
  value,
  setValue,
  autoCapitalize = "none",
  keyboardType = "default",
}) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <AutoGrowingTextInput
        placeholderTextColor={defaultStyles.colors.medium}
        minHeight={50}
        placeholder={placeholder}
        keyboardType={keyboardType}
        // autoCorrect={false}
        autoCapitalize={autoCapitalize}
        style={styles.textArea}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 10,
    flexDirection: "row",
    width: "100%",
    height: "50%",
    padding: 14,
    marginVertical: 15,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  textArea: {
    justifyContent: "flex-start",
    textAlignVertical: "top",
    color: colors.black,
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextArea;
