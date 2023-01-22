import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import _serveToast from "./_serveToast";

const _offlineDataSync = async (
  userId,
  phone_number,
  setLoading,
  formsStats,
  setStatsData
) => {
  try {
    setLoading(true);
    const data = await AsyncStorage.getItem("@formdata");
    console.log(data)
    if (data && data.length > 0) {
      const forms = JSON.parse(data);
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

      const res = await Promise.all(output);
      if (res && res.length > 0) {
        for (let saved of res) {
          if (saved) {
            setLoading(true);
            let form = saved[0].form;
            for (let single_form_data of saved[0].saved) {
              const queryString = Object.keys(single_form_data)
                .map((key) => {
                  return (
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(single_form_data[key])
                  );
                })
                .join("&");

              const { data } = await axios.get(
                `/questionResponse?formId=${form.formId}&auditorId=${userId}&auditorNumber=${phone_number}&${queryString}`
              );
              if (data.status) {
                const onlineData = await AsyncStorage.getItem(
                  `online-${form.formId}`
                );
                let dd = onlineData ? JSON.parse(onlineData) : [];
                dd.push(single_form_data);
                await AsyncStorage.setItem(
                  `online-${form.formId}`,
                  JSON.stringify(dd)
                );
                const savedData = await AsyncStorage.getItem(
                  `saved-${form.formId}`
                );
                let ds = savedData ? JSON.parse(savedData) : [];
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
                    ["online-${form.formId}"]:
                      formsStats?.["online-${form.formId}"] + 1,
                  })
                );
                setStatsData({
                  ...formsStats,
                  ["saved-${form.formId}"]:
                    formsStats?.["saved-${form.formId}"] - 1,
                  ["online-${form.formId}"]:
                    formsStats?.["online-${form.formId}"] + 1,
                });
              }
            }
            setLoading(false);
          } else {
            setLoading(false);
          }
        }
      } else {
        _serveToast("No data to sync");
        setLoading(false);
      }
    } else {
      _serveToast("No data to sync");
      setLoading(false);
    }
  } catch (error) {
    _serveToast(error);
    setLoading(false);
  }
};

export default _offlineDataSync;
