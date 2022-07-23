import React, { useEffect, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FormDataContext } from "../context/formContext";
import FormListItem from '../components/FormListItem'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import {  } from '../context/statsContext'

function ResponseStats({navigation}) {


  return (
    <View style={styles.container}>
        <FormListItem
            IconComponent={<MaterialCommunityIcons name="access-point-network" color="green" size={30}/>}
            title={"Online"}
            subSubTitle={"Online responses"}
            onPress={() => navigation.navigate("Response")}
        >
        </FormListItem>
        <FormListItem
            IconComponent={<MaterialCommunityIcons name="access-point-network-off" color="red" size={30}/>}
            title={"Offline"}
            subSubTitle={"Offline responses"}
            onPress={() => navigation.navigate("Response")}

        >
        </FormListItem>
        <FormListItem
            IconComponent={<MaterialCommunityIcons name="book-edit-outline" color="gray" size={30}/>}
            title={"Draft"}
            subSubTitle={"Draft responses"}
            onPress={() => navigation.navigate("Response")}
        >
        </FormListItem>
    </View>
  );
}

export default ResponseStats;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    }
});
