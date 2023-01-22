import React, { useState, useContext, useEffect } from "react";
import { Divider } from "@ui-kitten/components";
import {
  View,
  Text,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity
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
import _serveToast from "../utils/_serveToast";

export const HomeScreen = ({ navigation }) => {

  const [authState, setAuthState] = useContext(AuthContext);
  const { user } = authState;
  const userId = user?.user_id || user?.user?.user_id;
  const [formsData, setFormsData] = useContext(FormDataContext);
  const [formsStats, setStatsData] = useContext(StatsDataContext);
  const [notConnected, setNotConnected] = useState(false);
  const [netInfo, setNetInfo] = useState("");
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!user || user.status === false || user.length < 0) {
      navigation.navigate("Signin");
    }
  }, [formsData]);

  useEffect(() => {
    const data = NetInfo.addEventListener((authState) => {
      setNetInfo(
        `connectionType:${authState.type} IsConnected?: ${authState.isConnected}`
      );
      if (authState.isConnected === true) {
        setNotConnected(false);
      } else {
        _serveToast("You are offline");
        setNotConnected(true);
      }
    });
    return data;
  }, []);

  useEffect(() => {
    _loadForms();
  }, []);

  const _loadForms = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/forms?userid=${userId}`);
      setForms(data.formDetail);
      _storeFormsData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const _storeFormsData = async (data) => {

    
//console.log(data);
    if(data.length > 0){
    try {
      await AsyncStorage.setItem("@formdata", JSON.stringify(data.formDetail));
      console.log(data);
      _serveToast("Forms downloaded");
    } catch (error) {
      _serveToast("Forms download failed"); 
    }
  }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      _loadForms();
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <>
      <View
       RefreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
       style={{ padding: 5 }}>
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
                Online
              </Text>
            </View>
          </>
        ) : (
          <View>
            <Text
              style={{
                color: "red",
                fontSize: 16,
                textTransform: "uppercase",
              }}
            >
              Offline
            </Text>
          </View>
        )}
      </View>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text>Loading Forms</Text>
        </View>
      ) : (
        <>
          {notConnected ? (
            <FlatList
              data={formsData}
              keyExtractor={(formsData) => formsData.formId.toString()}
              showsVerticalScrollIndicator={false}
              inverted={true}
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
          ) : (
            <FlatList
              data={forms}
              keyExtractor={(forms) => forms.formId.toString()}
              showsVerticalScrollIndicator={false}
              inverted={true}
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
        </>
      )}
    </>
  );
};
