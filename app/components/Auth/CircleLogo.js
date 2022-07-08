import React from "react";
import { View, Image, Text } from "react-native";

function CircleLogo({ children }) {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 10,
        // paddingBottom: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          height: 150,
          width: 150,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 17,
          marginTop: 15,
        }}
      >
        {children ? (
          children
        ) : (
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 300,
              height: 300,
              // marginTop: -30,
              marginVertical: 30,
              marginHorizontal: 30,
            }}
          />
        )}
      </View>
    </View>
  );
}

export default CircleLogo;
