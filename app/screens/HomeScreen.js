import React, { useState, useContext, useEffect, useRef } from "react";
import { Divider } from "@ui-kitten/components";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { AuthContext } from "../context/authContext";
import { FormDataContext } from "../context/formContext";
import { StatsDataContext } from "../context/statsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import colors from "../config/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FormListItem from "../components/FormListItem";
import moment from "moment";
import _serveToast from "../utils/_serveToast";
import { API } from "../config/baseUrl";
import { useRoute } from "@react-navigation/native";

export const HomeScreen = ({ navigation }) => {
  const route = useRoute();
  const [authState, setAuthState] = useContext(AuthContext);
  const { user } = authState;
  const userId = user?.user_id || user?.user?.user_id;
  //const [formsData, setFormsData] = useContext(FormDataContext);
  const [formsStats, setStatsData] = useContext(StatsDataContext);
  const [isConnected, setIsConnected] = useState(false);
  const [netInfo, setNetInfo] = useState("");
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user || user.status === false) {
      navigation.navigate("Signin");
    }
  }, [user]);

  useEffect(() => {
    if (!forms || forms.length === 0) {
      _loadForms();
    }
  }, [forms]);

const netInfoListener = useRef();

useEffect(() => {
  netInfoListener.current = NetInfo.addEventListener((user) => {
    setNetInfo(`connectionType:${user.type} IsConnected?: ${user.isConnected}`);

    if (user.isConnected === true) {
      setIsConnected(false);
    } else {
      _serveToast("You are offline");
      setIsConnected(true);
    }
  });

  return () => {
    netInfoListener.current.remove();
  };
}, []);

const backHandlerListener = useRef();

useEffect(() => {
  if (route.name === "Home") {
    backHandlerListener.current = BackHandler.addEventListener(
      "hardwareBackPress",
      _handleBackPress
    );
  }

  return () => {
    if (backHandlerListener.current) {
      backHandlerListener.current.remove();
    }
  };
}, [route]);



  const _loadForms = async () => {
    try {
      const formDataOffline = JSON.parse(
        await AsyncStorage.getItem("@formdata")
      );

      if (formDataOffline && formDataOffline.length > 0) {
        setForms(formDataOffline);
      } else if (!isConnected) {
        _downloadForms();
      }
    } catch (err) {
      _serveToast("Something went wrong");
    }
  };

  const _downloadForms = async () => {
    try {
      const { data } = await axios.get(`${API}/forms?userid=${userId}`);
      await AsyncStorage.setItem("@formdata", JSON.stringify(data.formDetail));
      _serveToast("Forms updated");
    } catch (error) {
      _serveToast("Check your internet connection");
    }
  };

  const _handleRefresh = () => {
    setTimeout(() => {
      _downloadForms();
    }, 1000);
  };

  const _handleBackPress = () => {
    return route.name == "Home" ? true : false;
  };


const _renderEmptyForms = () => {
  if (forms.length != 0) return null;

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flex: 1,
        marginVertical: 200,
      }}
    >
      <Icon
        name="file-cancel-outline"
        color={colors.primary}
        size={130}
      />
      <Text>No forms</Text>
    </View>
  );
};

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={_handleRefresh} />
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
            paddingHorizontal: 5,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              flex: 6,
            }}
          >
            Showing{" "}
            {forms.length > 0 && forms.length == 1
              ? forms.length + " form"
              : forms.length + " forms"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              flex: 3,
            }}
          >
            {moment().format("llll")}
          </Text>
        </View>

        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flex: 1,
              marginVertical: 200,
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text>Loading Forms</Text>
          </View>
        ) : (
          <FlatList
            data={forms}
            keyExtractor={(forms) => forms.formId.toString()}
            showsVerticalScrollIndicator={false}
            inverted={true}
            ListFooterComponent={_renderEmptyForms}
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
                  onPress={() => navigation.navigate("FormDetailsScreen", item)}
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
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "green", fontWeight: "bold" }}>
                      {(formsStats && formsStats[`online-${item.formId}`]) ||
                        0 + " "}
                    </Text>
                    <Text style={{ color: "green" }}> Online</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "red", fontWeight: "bold" }}>
                      {(formsStats && formsStats[`saved-${item.formId}`]) ||
                        0 + " "}
                    </Text>
                    <Text style={{ color: "red" }}> Offline</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};