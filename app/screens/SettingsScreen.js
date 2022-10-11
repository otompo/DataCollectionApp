import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormDataContext } from "../context/formContext";

function SettingsScreen(props) {
  const [formsData, setFormsData] = useContext(FormDataContext);

  useEffect(() => {}, [formsData]);
  return (
    <View style={styles.container}>
      <Text style={{ marginLeft: 30 }}>
        Application Screen
        {/* {JSON.stringify(formsData, null, 4)} */}
      </Text>
    </View>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({});
