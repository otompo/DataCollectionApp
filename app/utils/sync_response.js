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
            //    var queryString = Object.keys(res)
            //    .map((key) => {
            //      return (
            //        encodeURIComponent(key) + "=" + encodeURIComponent(res[key])
            //      );
            //    })
            //    .join("&");
     
            //  const { data } = await axios.get(
            //    `/questionResponse?formId=${forms.formId}&auditorId=${userId}&auditorNumber=${phone_number}&${queryString}`
            //  );

            //    await AsyncStorage.setItem(
            //     "@Stats",
            //     JSON.stringify({
            //       ...formsStats,
            //       [`saved-${forms.formId}`]: formsStats?.offline
            //         ? formsStats?.offline + 1
            //         : 1,
            //     })
            //   );
            //   setStatsData({
            //     ...formsStats,
            //     [`saved-${forms.formId}`]: formsStats?.offline
            //       ? formsStats?.offline + 1
            //       : 1,
            //   });
               
           })
           
        }
        
    

}

export default sync_response;