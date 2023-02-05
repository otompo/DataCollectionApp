import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { AuthContext } from "../context/authContext";
import { StatsDataContext } from "../context/statsContext";
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import colors from "../config/colors";
import { UserAudioInput } from "../components/Audio/AudioInput";
import {
  UserTextInput,
  UserPhoneInput,
  UserDateInput,
  UserTimeInput,
  UserNoteInput,
  UserImageInput,
  UserVideoInput,
  //UserAudioInput,
  UserSingleSelectInput,
  UserMultySelectInput,
  UserSliderScaletInput,
  UserLikertScaletInput,
  UserBarQRCodeInput,
  UserRatingInput,
  UserSectionBreakInput,
  UserIntroductoryInput,
  UserSignatureCaptureInput,
  UserImageGeoTagInput,
} from "../components/forms/FormInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import NetInfo from "@react-native-community/netinfo";
import * as yup from "yup";
import { API } from "../config/baseUrl";
import OffLineButton from "../components/Button/OffLineButton";
import _serveToast from "../utils/_serveToast";

function FormDetailsScreen({ route, navigation }) {
  const forms = route.params;
  const [authState, setAuthState] = useContext(AuthContext);
  const { user } = authState;
  const [formsStats, setStatsData] = useContext(StatsDataContext);
  const [networkConnection, setNetworkConnection] = useState("");
  const [questions, setQuestions] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [refreshing, setRefreshing] = useState(false);

    const netInfoListener = useRef();
    useEffect(() => {
      netInfoListener.current = NetInfo.addEventListener((user) => {
        setNetworkConnection(user.isInternetReachable);
      });
    }, []);

    useEffect(() => {
      if (!authState.user) {
        return;
      }
      if (!questions || questions.length < 1) {
        _loadQuestions();
      }
    }, [authState.user, questions]);

    const _loadQuestions = async () => {
      setInitLoading(true);
      try {
        const data = await AsyncStorage.getItem(`${forms.formId}`);
        if (data) {
          setQuestions(JSON.parse(data));
        }
        setInitLoading(false);

        if (networkConnection) {
          _downloadQuestions();
        }
      } catch (err) {
        _serveToast("Something went wrong");
      }
    };
    const _downloadQuestions = async () => {
      try {
        const { data } = await axios.get(
          API +
            `/formquestions?FormId=${forms.formId}&UserId=${authState.user.user_id}`
        );
        await AsyncStorage.setItem(
          `${forms.formId}`,
          JSON.stringify(data.questionDetail)
        );
        _serveToast("Questions updated");
      } catch (error) {
        _serveToast("Check your internet connection");
      }
    };

    const onRefresh = () => {
      setTimeout(() => {
        _downloadQuestions();
      }, 2000);
    };

  // const netInfoListener = useRef();
  // useEffect(() => {
  //   netInfoListener.current = NetInfo.addEventListener((authState) => {
  //     setNetworkConnection(authState.isInternetReachable);
  //   });

  //   return () => {
  //     netInfoListener.current.remove();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (authState.user) {
  //     const { phone_number, user_id } = authState.user;
  //     setUserId(user_id);
  //     setPhone_Number(phone_number);
  //   }
  //   if (!questions || questions.length < 1) {
  //     _loadQuestions();
  //   }
  // }, [questions]);

  // const _loadQuestions = async () => {
  //   setInitLoading(true);
  //   try {
  //     const data = await AsyncStorage.getItem(`${forms.formId}`);
  //     setQuestions(JSON.parse(data));
  //     setInitLoading(false);

  //     if (networkConnection) {
  //       _downloadQuestions();
  //     }
  //   } catch (err) {
  //     _serveToast("Something went wrong");
  //   }
  // };
  // const _downloadQuestions = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       API + `/formquestions?FormId=${forms.formId}&UserId=${userId}`
  //     );
  //     await AsyncStorage.setItem(
  //       `${forms.formId}`,
  //       JSON.stringify(data.questionDetail)
  //     );
  //     _serveToast("Questions updated");
  //   } catch (error) {
  //     _serveToast("Check your internet connection");
  //   }
  // };

  // const onRefresh = () => {
  //   setTimeout(() => {
  //     _downloadQuestions();
  //   }, 2000);
  // };

  //lets get the initial values on the fields
  const initialVars = useMemo(() => {
    const values = {};
    questions?.map((question) => {
      return (values[question.questionId] = "");
    });

    return values;
  }, [questions]);

  const handleSubmitForm = async (values) => {
    try {
      setLoading(true);

      if (!networkConnection) {
        const draftData = await AsyncStorage.getItem(`saved-${forms.formId}`);
        let dd = [];

        if (draftData) {
          dd = JSON.parse(draftData);
        }

        dd.push(values);

        await AsyncStorage.setItem(`saved-${forms.formId}`, JSON.stringify(dd));
        //update response statistics
        // console.log({[`saved-${forms.formId}`]: formsStats?.offline})
        // let jj = {[`saved-${forms.formId}`]: formsStats?.offline? formsStats?.offline + 1: 1}
        // console.log(jj)
        await AsyncStorage.setItem(
          "@Stats",
          JSON.stringify({
            ...formsStats,
            [`saved-${forms.formId}`]: formsStats?.[`saved-${forms.formId}`]
              ? formsStats?.[`saved-${forms.formId}`] + 1
              : 1,
          })
        );
        setStatsData({
          ...formsStats,
          [`saved-${forms.formId}`]: formsStats?.[`saved-${forms.formId}`]
            ? formsStats?.[`saved-${forms.formId}`] + 1
            : 1,
        });
        _serveToast("Offline? we saved your data");

        navigation.navigate("Home");
      } else {
        var queryString = Object.keys(values)
          .map((key) => {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(values[key])
            );
          })
          .join("&");

        const { data } = await axios.get(
          API +
            `/questionResponse?formId=${forms.formId}&auditorId=${userId}&auditorNumber=${phone_number}&${queryString}`
        );

        //update response statistics
        await AsyncStorage.setItem(
          "@Stats",
          JSON.stringify({
            ...formsStats,
            [`online-${forms.formId}`]: formsStats?.[`online-${forms.formId}`]
              ? formsStats?.[`online-${forms.formId}`] + 1
              : 1,
          })
        );
        setStatsData({
          ...formsStats,
          [`online-${forms.formId}`]: formsStats?.[`online-${forms.formId}`]
            ? formsStats?.[`online-${forms.formId}`] + 1
            : 1,
        });
        _serveToast(data.message);
      }
      navigation.navigate("Home");
      setLoading(false);
    } catch (err) {
      _serveToast(err.toString());
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleOfflineSubmit = async (values) => {
    try {
      setLoading(true);
      const draftData = await AsyncStorage.getItem(`draft-${forms.formId}`);
      let dd = [];

      if (draftData) {
        //draft already exists for this form, lets push some more drat data to it
        dd = JSON.parse(draftData);
      }

      dd.push(values);
      //save form answers to draft with the formId as key
      await AsyncStorage.setItem(`draft-${forms.formId}`, JSON.stringify(dd));

      await AsyncStorage.setItem(
        "@Stats",
        JSON.stringify({
          ...formsStats,
          [`draft-${forms.formId}`]: formsStats?.[`draft-${forms.formId}`]
            ? formsStats?.[`draft-${forms.formId}`] + 1
            : 1,
        })
      );
      setStatsData({
        ...formsStats,
        [`draft-${forms.formId}`]: formsStats?.[`draft-${forms.formId}`]
          ? formsStats?.[`draft-${forms.formId}`] + 1
          : 1,
      });
      //navigate to homepage
      navigation.navigate("Home");
    } catch (err) {
      _serveToast(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.formContainer}
      >
        {initLoading ? (
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
            <Text>Loading Questions</Text>
          </View>
        ) : (
          <Formik
            initialValues={initialVars}
            enableReinitialize={true}
            onSubmit={(values) => handleSubmitForm(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              setFieldValue,
            }) => {
              return (
                <>
                  <View>
                    {questions &&
                      questions.map((question) => {
                        return (
                          <View
                            key={
                              question.questionId.toString() +
                              Math.random().toString
                            }
                          >
                            {question.questionType === "Phone" ? (
                              <View style={styles.questionCard}>
                                <UserPhoneInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  onChange={handleChange(question.questionId)}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  keyboardType="numeric"
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Text" ? (
                              <View style={styles.questionCard}>
                                <UserTextInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  onChange={handleChange(question.questionId)}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  autoCapitalize="words"
                                  autoCorrect={false}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Date" ? (
                              <View style={styles.questionCard}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                  }}
                                >
                                  <UserDateInput
                                    name={question.questionTittle}
                                    id={question.questionId}
                                    pos={question.questionPosition}
                                    desc={question.questionDescription}
                                    type={question.questionType}
                                    setFieldValue={setFieldValue}
                                    onChange={handleChange(question.questionId)}
                                    questionMandatoryOption={
                                      question.questionMandatoryOption
                                    }
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    errors={question.questionType}
                                  />
                                </View>
                              </View>
                            ) : question.questionType === "Time" ? (
                              <View style={styles.questionCard}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                  }}
                                >
                                  <UserTimeInput
                                    name={question.questionTittle}
                                    pos={question.questionPosition}
                                    desc={question.questionDescription}
                                    type={question.questionType}
                                    onChange={handleChange(question.questionId)}
                                    questionMandatoryOption={
                                      question.questionMandatoryOption
                                    }
                                    setFieldValue={setFieldValue}
                                    id={question.questionId}
                                    autoCorrect={false}
                                    errors={question.questionType}
                                  />
                                </View>
                              </View>
                            ) : question.questionType === "SingleChoice" ? (
                              <View style={styles.questionCard}>
                                <UserSingleSelectInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  question={question}
                                  id={question.questionId}
                                  setFieldValue={setFieldValue}
                                  type={question.questionType}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "MultipleChoice" ? (
                              <View style={styles.questionCard}>
                                <UserMultySelectInput
                                  setFieldValue={setFieldValue}
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  question={question}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Number" ? (
                              <View style={styles.questionCard}>
                                <UserTextInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  onChange={handleChange(question.questionId)}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  keyboardType="numeric"
                                  autoCorrect={false}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Location" ? (
                              <View style={styles.questionCard}>
                                <UserImageGeoTagInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  id={question.questionId}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "SectionBreak" ? (
                              <View style={styles.sectionBreak}>
                                <UserSectionBreakInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                />
                              </View>
                            ) : question.questionType === "Introductory" ? (
                              <View style={styles.sectionBreak}>
                                <UserIntroductoryInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                />
                              </View>
                            ) : question.questionType === "Image" ? (
                              <View style={styles.questionCard}>
                                <View>
                                  <UserImageInput
                                    name={question.questionTittle}
                                    pos={question.questionPosition}
                                    desc={question.questionDescription}
                                    type={question.questionType}
                                    setFieldValue={setFieldValue}
                                    id={question.questionId}
                                    errors={question.questionType}
                                  />
                                </View>
                              </View>
                            ) : question.questionType === "ImageGeoTag" ? (
                              <View style={styles.questionCard}>
                                <View>
                                  <UserImageGeoTagInput
                                    name={question.questionTittle}
                                    pos={question.questionPosition}
                                    desc={question.questionDescription}
                                    type={question.questionType}
                                    setFieldValue={setFieldValue}
                                    id={question.questionId}
                                    errors={question.questionType}
                                  />
                                </View>
                              </View>
                            ) : question.questionType === "Signature" ? (
                              <View style={styles.questionCard}>
                                <UserSignatureCaptureInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  id={question.questionId}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Email" ? (
                              <View style={styles.questionCard}>
                                <UserTextInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  onChange={handleChange(question.questionId)}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  autoCompleteType="email"
                                  keyboardType="email-address"
                                  autoCorrect={false}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Audio" ? (
                              <View style={styles.questionCard}>
                                <UserAudioInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  id={question.questionId}
                                  autoCorrect={false}
                                />
                              </View>
                            ) : question.questionType === "Video" ? (
                              <View style={styles.questionCard}>
                                <UserVideoInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  id={question.questionId}
                                  autoCorrect={false}
                                />
                              </View>
                            ) : question.questionType === "Barcode" ? (
                              <View style={styles.questionCard}>
                                <UserBarQRCodeInput
                                  id={question.questionId}
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "LickerScale" ? (
                              <View style={styles.questionCard}>
                                <UserLikertScaletInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  likerValue={question.likerValue.split(",")}
                                  id={question.questionId}
                                  setFieldValue={setFieldValue}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Scale" ? (
                              <View style={styles.questionCard}>
                                <UserSliderScaletInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  id={question.questionId}
                                  maximum={Number(question.Maximum)}
                                  minimum={Number(question.Minimum)}
                                  setFieldValue={setFieldValue}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Rating" ? (
                              <View style={styles.questionCard}>
                                <UserRatingInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  id={question.questionId}
                                  setFieldValue={setFieldValue}
                                />
                              </View>
                            ) : question.questionType === "Note" ? (
                              <View style={styles.questionCard}>
                                <UserNoteInput
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  onChange={handleChange(question.questionId)}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  autoCapitalize="words"
                                  autoCorrect={false}
                                  errors={question.questionType}
                                />
                              </View>
                            ) : question.questionType === "Qrcode" ? (
                              <View style={styles.questionCard}>
                                <UserBarQRCodeInput
                                  id={question.questionId}
                                  name={question.questionTittle}
                                  pos={question.questionPosition}
                                  desc={question.questionDescription}
                                  type={question.questionType}
                                  setFieldValue={setFieldValue}
                                  questionMandatoryOption={
                                    question.questionMandatoryOption
                                  }
                                  errors={question.questionType}
                                />
                              </View>
                            ) : null}
                          </View>
                        );
                      })}
                  </View>
                  <View flex style={styles.buttonContainer}>
                    {/* <View>
                    <OffLineButton
                      title="Save Draft"
                      handlePress={() => handleOfflineSubmit(values)}
                      loading={loading}
                      bwidth={160}
                      bcolor={"dark"}
                    />
                  </View> */}
                    <View>
                      <SubmitButton
                        title="Submit"
                        onPress={handleSubmit}
                        loading={loading}
                        bwidth={360}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </Formik>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default FormDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  formContainer: {
    paddingVertical: 15,
  },
  sectionBreak: {
    marginVertical: 10,
  },
  questionCard: {
    paddingVertical: 15,
    margin: 5,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 70,
    // marginHorizontal: 2,
    borderRadius: 5,
  },
  headContainer: {
    backgroundColor: colors.primary,
  },
  footContainer: {
    backgroundColor: colors.white,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  headTitle: {
    fontSize: 25,
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  dateButton: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: 55,
    height: 55,
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "bold",
  },
});
