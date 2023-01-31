import React, { useContext } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import _ from "lodash";
import { API } from "../config/baseUrl";

const sync_response = async (
  userId,
  phone_number,
  setLoading,
  formsStats,
  setStatsData
) => {
  setLoading(true);

  //get all offline forms
  const data = await AsyncStorage.getItem("@formdata");
  if (data) {
    const forms = JSON.parse(data);
    // const itemCount = forms.length
    const output = forms.map(async (form) => {
      let dataobj = [];
      const drf = await AsyncStorage.getItem(`saved-${form.formId}`);
      if (drf) {
        let saved = JSON.parse(drf);
        let formDrafts = { form, saved };
        dataobj = [formDrafts, ...dataobj];
        return dataobj;
      }
    });
    Promise.all(output).then((res) => {
      res.map((saved, i) => {
        if (saved) {
          setLoading(true);
          let form = saved[0].form;
          saved[0].saved.map(async (single_form_data) => {
            //we do upload hear and update of stats
            var queryString = Object.keys(single_form_data)
              .map((key) => {
                return (
                  encodeURIComponent(key) +
                  "=" +
                  encodeURIComponent(single_form_data[key])
                );
              })
              .join("&");

            const { data } = await axios.get(
              API +
                `/questionResponse?formId=${form.formId}&auditorId=${userId}&auditorNumber=${phone_number}&${queryString}`
            );

            if (data.status) {
              //lets add to local storage-online
              const onlineData = await AsyncStorage.getItem(
                `online-${form.formId}`
              );
              let dd = [];

              if (onlineData) {
                dd = JSON.parse(onlineData);
              }

              dd.push(single_form_data);

              await AsyncStorage.setItem(
                `online-${form.formId}`,
                JSON.stringify(dd)
              );

              //lets remove from local storage-saved
              const savedData = await AsyncStorage.getItem(
                `saved-${form.formId}`
              );
              let ds = [];

              if (savedData) {
                ds = JSON.parse(savedData);
              }

              ds = ds.filter((item) => {
                return !_.isEqual(item, single_form_data);
              });

              await AsyncStorage.setItem(
                `saved-${form.formId}`,
                JSON.stringify(ds)
              );

              await AsyncStorage.setItem(
                "@Stats",
                JSON.stringify({
                  ...formsStats,
                  [`saved-${form.formId}`]:
                    formsStats?.[`saved-${form.formId}`] - 1,
                  [`online-${form.formId}`]:
                    formsStats?.[`online-${form.formId}`] + 1,
                })
              );
              setStatsData({
                ...formsStats,
                [`saved-${form.formId}`]:
                  formsStats?.[`saved-${form.formId}`] - 1,
                [`online-${form.formId}`]:
                  formsStats?.[`online-${form.formId}`] + 1,
              });

              setLoading(false);
            }
          });
        }
      });
    });
    setLoading(false);
  } else {
    setLoading(false);
  }
};

export default sync_response;
