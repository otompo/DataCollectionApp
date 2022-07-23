import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@kaloraat/react-native-text";
import * as ImagePicker from "expo-image-picker";
import FormListItem from '../../components/FormListItem'

export default function DraftScreen({ navigation }) {



    const [drafts, setDrafts] = useState([])

    const getDraft=async()=>{
     
        const data = await AsyncStorage.getItem('@formdata');
        //console.log(data);
        if(data){
           const forms = JSON.parse(data);
          // const itemCount = forms.length
        const output = forms.map(async form=>{
            let dataobj = [];
            const drf = await AsyncStorage.getItem(`draft-${form.formId}`);
            if(drf){
                let draft =  JSON.parse(drf);
                let formDrafts = {form,draft}
                dataobj = [formDrafts,...dataobj]
                //console.log("DD",formDrafts)
                //setDrafts([...formDrafts,...drafts])
                return dataobj
            }
       })
           Promise.all(
            output
           ).then(res=>{setDrafts(res)})
           
        }
        //console.log("DRAFT",drafts)
    }

   const renderItem = ({item})=>(
        <View>
        {item?
        <View>
        <FormListItem
       title={item[0]?.form?.formName}
       subSubTitle={item[0]?.form?.createdDate}
       onPress={() => console.log("online pressed")}
       icon=""
      />
        <View style={{marginLeft:25}}>
          {item[0]?.draft?.map(drftIn=>{
             const answeres = Object.values(drftIn);
             const length = answeres.filter(ans=>ans !== "" && ans != null).length
            return <FormListItem
             title={new Date().toLocaleDateString()}
             subSubTitle={`${"Answered"+" "+length }`}
             onPress={() => console.log("online pressed")}
             />
          })}
        </View>
    </View>:null}
      </View>
      )

    useEffect(()=>{
        getDraft();
    },[])
    
    return (
      <FlatList
        data={drafts}
       // extraData={drafts.length}
        keyExtractor={(item)=>item?.form?.formId}
        renderItem={renderItem}
      />
     
    );
  }