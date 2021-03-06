import React, { useState, useContext, useEffect } from "react";
import { Divider } from "@ui-kitten/components";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { FormDataContext } from "../context/formContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import colors from "../config/colors";
import FormListItem from "../components/FormListItem";
import moment from "moment";

export const HomeScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const [formsData, setFormsData] = useContext(FormDataContext);
  const [networkConnection, setNetworkConnection] = useState("");
  const user_id = state?.user_id || state?.user?.user_id;
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!state || state.status === false) {
      navigation.navigate("Signup");
    }
    // if (state.user) {
    //   const { user_id } = state.user;
    //   setUserId(user_id);
    // }
  }, [formsData]);

  useEffect(() => {
    loadForms();
    if (!networkConnection) {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "You are offline ",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("You are offline");
      }
    } else {
      if (Platform.OS === "android") {
        ToastAndroid.showWithGravityAndOffset(
          "Network Restored",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      } else {
        AlertIOS.alert("Network Restored");
      }
    }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnection(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/forms?userid=${user_id}`);
      //console.log(data);
      setForms(data.formDetail);
      await AsyncStorage.setItem("@formdata", JSON.stringify(data.formDetail));
      setLoading(false);
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadForms();
      setRefreshing(false);
    }, 2000);
  };

  // if (!forms) {
  //   return <ActivityIndicator size="large" />;
  // }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {loading ? (
        <View
          style={{
            marginVertical: 200,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          {!networkConnection ? (
            <FlatList
              data={formsData}
              keyExtractor={(formsData) => formsData.formId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <FormListItem
                  // image={{ uri: item.image.url }}
                  title={item.formName}
                  // subTitle={`GHC ${item.food.price}.00`}
                  subSubTitle={`${moment(item.createdDate).fromNow()} `}
                  onPress={() => navigation.navigate("FormDetailsScreen", item)}
                />
              )}
            />
          ) : (
            <FlatList
              data={forms}
              keyExtractor={(forms) => forms.formId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <FormListItem
                  // image={{ uri: item.image.url }}
                  title={item.formName}
                  // subTitle={`GHC ${item.food.price}.00`}
                  subSubTitle={`${moment(item.createdDate).fromNow()} `}
                  onPress={() => navigation.navigate("FormDetailsScreen", item)}
                />
              )}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};
