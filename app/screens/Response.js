import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  AlertIOS,
  Image,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../config/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@kaloraat/react-native-text";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// import { Avatar } from "react-native-paper";
// import ListItem from "../components/ListItem";
// import moment from "moment";




function OfflineScreen({ navigation }) {

const [saved, setSaved] = useState([])
    
useEffect(()=>{
    getOffline()
},[])

const getOffline=async()=>{
    const data = await AsyncStorage.getItem('@formdata');
    if(data){
       const forms = JSON.parse(data);
    
       forms.map(async form=>{
            const drf = await AsyncStorage.getItem(`saved-${form.formId}`);
            if(drf){
                setSaved([...saved,...JSON.parse(drf)])
            }
       })
    }
    console.log("saved",saved)
}


  return (
    <View>
      <Text>History</Text>
    </View>
  );
}

function DraftScreen({ navigation }) {

    useEffect(()=>{
        getDraft();
    },[])

    const [drafts, setDrafts] = useState([])

    const getDraft=async()=>{
        const data = await AsyncStorage.getItem('@formdata');
        if(data){
           const forms = JSON.parse(data);
        
           forms.map(async form=>{
                const drf = await AsyncStorage.getItem(`draft-${form.formId}`);
                if(drf){
                    setDrafts([...drafts,...JSON.parse(drf)])
                }
           })
        }
        console.log("DRAFT",drafts)
    }
    
    return (
      <View>
        <Text>Draft</Text>
      </View>
    );
  }

function OnlineScreen({ navigation }) {

    useEffect(()=>{
    
    },[])

    const getOnline=()=>{
        
    }

    return (
      <View>
        <Text>Online</Text>
      </View>
    );
  }


const TopTabNavigator = createMaterialTopTabNavigator();

function TopTabs() {
  return (
    <TopTabNavigator.Navigator
      initialRouteName="Offline"
      screenOptions={{
        tabBarActiveTintColor: colors.dark,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          color: colors.white,
        },
        tabBarStyle: { backgroundColor: colors.primary },
      }}
    >
      <TopTabNavigator.Screen
        name="Offline"
        component={OfflineScreen}
        options={{
          tabBarLabel: "Offline",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="access-point-network-off" color="red" size={30}/>
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Draft"
        component={DraftScreen}
        options={{
          tabBarLabel: "Draft",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book-edit-outline" color="gray" size={30}/>
          ),
        }}
      />
      <TopTabNavigator.Screen
        name="Online"
        component={OnlineScreen}
        options={{
          tabBarLabel: "Online",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="access-point-network" color="green" size={30}/>
          ),
        }}
      />
    </TopTabNavigator.Navigator>
  );
}

function Response() {
  return <TopTabs />;
}
export default Response;

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    justifyContent: "space-between",
    marginHorizontal: 5,
    backgroundColor: colors.white
  },
  container: {
    marginTop: 15,
    alignItems: "center",
    padding: 10
  },
  icon: {
    position: "absolute",
    top: 125,
    right: 110,
    elevation: 3,
  },
  headerLine: {
    margin: 20,
  },
});
