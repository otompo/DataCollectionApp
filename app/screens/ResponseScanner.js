import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import axios from "axios";

function ResponseScanner({ route }) {
  const responseData = route.params;
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState("");

  useEffect(() => {
    handleReadData();
  }, []);

  const handleReadData = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("responseData", responseData);
    axios({
      method: "post",
      url: "https://beta.kpododo.com/api/v1/qr-scan-read.php",
      data: bodyFormData,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        //handle success
        setReadData(response);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        // console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{responseData}</Text>
      <Text>{readData}</Text>
    </View>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({});
