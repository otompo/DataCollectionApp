import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import axios from "axios";

function ResponseScanner({ route }) {
  const resData = route.params;
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState("");

  useEffect(() => {
    handleReadData();
  }, []);

  const handleReadData = async () => {
    var bodyFormData = new FormData();
    bodyFormData.append("resData", resData);
    const { data } = await axios({
      method: "post",
      url: "https://beta.kpododo.com/api/v1/qr-scan-read.php",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        setReadData(response);
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <View style={styles.container}>
      <Text>{resData}</Text>
      <Text>{data}</Text>
    </View>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({});
