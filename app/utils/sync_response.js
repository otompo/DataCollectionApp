import React from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

const sync_response=async()=>{
    //get all offline forms
        const data = await AsyncStorage.getItem('@formdata');
        //console.log(data);
        if(data){
           const forms = JSON.parse(data);
          // const itemCount = forms.length
        const output = forms.map(async form=>{
            let dataobj = [];
            const drf = await AsyncStorage.getItem(`saved-${form.formId}`);
            if(drf){
                let saved =  JSON.parse(drf);
                let formDrafts = {form,saved}
                dataobj = [formDrafts,...dataobj]
                return dataobj
            }
       })
           Promise.all(
            output
           ).then(res=>{
               console.log("SAVED",res)

               //loop current array and for each response upload and update statistics

               
           })
           
        }
        
    

}

export default sync_response;