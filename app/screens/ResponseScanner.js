import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import axios from "axios";

function ResponseScanner({ route }) {
  const resData = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const { data } = axios.post(`/qr-scan-read.php`);
    setData(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text>{resData}</Text>
      <Text>{data}</Text>
    </View>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({});
