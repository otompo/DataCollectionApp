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
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { FormDataContext } from "../context/formContext";
import { StatsDataContext } from "../context/statsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import colors from "../config/colors";
import FormListItem from "../components/FormListItem";
import moment from "moment";

export const HomeScreen = ({ navigation }) => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;
  const [formsData, setFormsData] = useContext(FormDataContext);
  const [formsStats, setStatsData] = useContext(StatsDataContext);
  const [notConnected, setNotConnected] = useState(false);
  const [netInfo, setNetInfo] = useState("");
  const user_id = state?.user_id || state?.user?.user_id;
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user || user.status === false || user.data === null) {
      navigation.navigate("Signup");
    }
  }, [formsData]);

  useEffect(() => {
    const data = NetInfo.addEventListener((state) => {
      setNetInfo(
        `connectionType:${state.type} IsConnected?: ${state.isConnected}`
      );
      if (state.isConnected === true) {
        setNotConnected(false);
      } else {
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            "You are offline ",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert("You are offline ");
        }
        setNotConnected(true);
      }
    });

    return data;
  }, []);

  useEffect(() => {
    loadForms();
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ padding: 5 }}>
        {!notConnected ? (
          <>
            <View>
              <Text
                style={{
                  color: "green",
                  fontSize: 16,
                  textTransform: "uppercase",
                }}
              >
                OnLine
              </Text>
            </View>
          </>
        ) : (
          <View>
            <Text
              style={{ color: "red", fontSize: 16, textTransform: "uppercase" }}
            >
              OffLine
            </Text>
          </View>
        )}
      </View>
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
          {!notConnected ? (
            <FlatList
              data={formsData}
              keyExtractor={(formsData) => formsData.formId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 2,
                    marginBottom: 5,
                  }}
                >
                  <FormListItem
                    title={item.formName}
                    subSubTitle={`${moment(item.createdDate).fromNow()} `}
                    onPress={() =>
                      navigation.navigate("FormDetailsScreen", item)
                    }
                  />
                  <Divider />
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate("ResponseStats")}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingVertical: 15,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        {(formsStats && formsStats[`online-${item.formId}`]) ||
                          0 + " "}
                      </Text>
                      <Text style={{ color: "green" }}>Online</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        {(formsStats && formsStats[`saved-${item.formId}`]) ||
                          0 + " "}
                      </Text>
                      <Text style={{ color: "red" }}>Offline</Text>
                    </View>
                    {/* <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "gray", fontWeight: "bold" }}>
                        {formsStats && formsStats[`draft-${item.formId}`] + " "}
                      </Text>
                      <Text style={{ color: "gray" }}>Draft</Text>
                    </View> */}
                  </TouchableOpacity>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={forms}
              keyExtractor={(forms) => forms.formId.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 2,
                    marginBottom: 5,
                  }}
                >
                  <FormListItem
                    title={item.formName}
                    subSubTitle={`${moment(item.createdDate).fromNow()} `}
                    onPress={() =>
                      navigation.navigate("FormDetailsScreen", item)
                    }
                  />
                  <Divider />
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => navigation.navigate("ResponseStats")}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingVertical: 15,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "green", fontWeight: "bold" }}>
                        {(formsStats && formsStats[`online-${item.formId}`]) ||
                          0 + " "}
                      </Text>
                      <Text style={{ color: "green" }}>Online</Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "red", fontWeight: "bold" }}>
                        {(formsStats && formsStats[`saved-${item.formId}`]) ||
                          0 + " "}
                      </Text>
                      <Text style={{ color: "red" }}>Offline</Text>
                    </View>
                    {/* <View
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Text style={{ color: "gray", fontWeight: "bold" }}>
                        {(formsStats && formsStats[`draft-${item.formId}`]) ||
                          0 + " "}
                      </Text>
                      <Text style={{ color: "gray" }}>Draft</Text>
                    </View> */}
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </>
      )}
    </ScrollView>
  );
};
