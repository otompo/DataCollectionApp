import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";
import { dummyData } from "../../data/Data";

function FrontBanner({ style }) {
  const [bannerData, setBannerData] = useState([]);
  useEffect(() => {
    setBannerData(dummyData);
  });

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.mainContainer}
    >
      <View style={[styles.container, style]}>
        <Swiper
          showButton={false}
          autoplay={true}
          autoplayTimeout={4}
          index={0}
          showsPagination={false}
        >
          {bannerData &&
            bannerData.map((item, i) => (
              <Image
                key={i}
                source={{ uri: item.uri }}
                style={styles.bannerImage}
              />
            ))}
        </Swiper>
      </View>
    </ScrollView>
  );
}

export default FrontBanner;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    // height: 200,
  },

  container: {
    flex: 1,
    marginHorizontal: 0,
    // height: 290,
  },

  swiper: {
    height: 100,
    alignItems: "center",
    borderRadius: 10,
  },

  bannerImage: {
    width: "100%",
    height: 300,
    // marginVertical: -10,
  },
});
