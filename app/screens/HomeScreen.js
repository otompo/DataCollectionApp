import React, { useState, useContext, useEffect } from "react";
import { Divider } from "@ui-kitten/components";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { FormsContext } from "../context/formContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import colors from "../config/colors";
import FormListItem from "../components/FormListItem";
import moment from "moment";

export const HomeScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  // const [forms, setForms] = useContext(FormsContext);
  const [networkConnection, setNetworkConnection] = useState("");
  const user_id = state?.user_id || state?.user?.user_id;
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // console.log("state", state);

  useEffect(() => {
    if (!state || state.status === false) {
      navigation.navigate("Signup");
    }
    // if (state.user) {
    //   const { user_id } = state.user;
    //   setUserId(user_id);
    // }
  }, []);

  useEffect(() => {
    loadForms();
    // if (!forms.length) {
    // }
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnection(state.isInternetReachable);
      // console.log(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const loadForms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/forms?userid=${user_id}`);
      // console.log(data);
      setForms(data.formDetail);
      await AsyncStorage.setItem("formdata", JSON.stringify(data.formDetail));
      setLoading(false);
    } catch (err) {
      console.log(err);
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
          {forms && forms.length > 0 ? (
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
          ) : (
            <View
              style={{
                marginVertical: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: colors.danger,
                  fontSize: 18,
                }}
              >
                No Forms
              </Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};
