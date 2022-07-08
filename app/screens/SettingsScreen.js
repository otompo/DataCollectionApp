import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormsContext } from "../context/formContext";

function SettingsScreen(props) {
  const [formsData, setFormsData] = useContext(FormsContext);

  return (
    <View style={styles.container}>
      <Text>SettingsScreen</Text>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({});
