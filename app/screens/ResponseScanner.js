import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SubmitButton from "../components/Button/SubmitButton";
import axios from "axios";

function ResponseScanner({ route }) {
  const resData = route.params;
  const [loading, setLoading] = useState(false);
  const [readData, setReadData] = useState("");

  var objectData = {
    tracker_id: 0,
    response_id: 52,
    form_id: 2,
  };

  useEffect(() => {
    handleReadData();
  }, []);

  const handleReadData = () => {
    var bodyFormData = new FormData();
    bodyFormData.append("objectData", objectData);
    axios({
      method: "post",
      url: "/qr-scan-read.php",
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
      <Text>{resData}</Text>
      <Text>{readData}</Text>
    </View>
  );
}

export default ResponseScanner;

const styles = StyleSheet.create({});
