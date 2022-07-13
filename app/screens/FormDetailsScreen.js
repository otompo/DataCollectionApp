import React, { useState, useContext, useEffect, useMemo } from "react";
import { AuthContext } from "../context/authContext";
import {
  View,
  Text,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  Platform,
  AlertIOS,
} from "react-native";
import axios from "axios";
import colors from "../config/colors";
import {
  UserTextInput,
  UserPhoneInput,
  UserDateInput,
  UserTimeInput,
  UserNoteInput,
  UserImageInput,
  UserVideoInput,
  UserAudioInput,
  UserSingleSelectInput,
  UserMultySelectInput,
  UserSliderScaletInput,
  UserLikertScaletInput,
  UserBarQRCodeInput,
  UserRatingInput,
  UserSectionBreakInput,
  UserSignatureCaptureInput,
} from "../components/forms/FormInput";
import SubmitButton from "../components/Button/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import NetInfo from "@react-native-community/netinfo";
import * as yup from "yup";

function FormDetailsScreen({ route, navigation }) {
  const forms = route.params;
  const formsData = route.params;
  const [state, setState] = useContext(AuthContext);
  const [networkConnection, setNetworkConnection] = useState("");
  const [questions, setQuestions] = useState("");
  const [questionsDetails, setQuestionsDails] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [phone_number, setPhone_Number] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetworkConnection(state.isInternetReachable);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (state.user) {
      const { phone_number, user_id } = state.user;
      setUserId(user_id);
      setPhone_Number(phone_number);
    }

    // if (!state || state.status === false) {
    //   navigation.navigate("Signup");
    // }

    if (!questionsDetails?.length) loadQuestions();
  }, [state.user]);

  const loadQuestions = async () => {
    try {
      setSuccess(true);

      const { data } = await axios.get(
        `/formquestions?FormId=${forms.formId}&UserId=${userId}`
      );

      setQuestions(data);
      setQuestionsDails(data.questionDetail);
      setSuccess(false);
    } catch (err) {
      // console.log(err);
      setSuccess(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadQuestions();
      setRefreshing(false);
    }, 2000);
  };

  //lets get the initial values on the fields
  const initialVars = useMemo(() => {
    const values = {};
    questionsDetails?.map((question) => {
      return (values[question.questionId] = "");
    });
    // console.log(values);
    return values;
  }, [questionsDetails]);

  if (!questionsDetails) {
    return <ActivityIndicator size="large" />;
  }

  const formValidationSchema = yup.object().shape({
    initialVars: yup
      .string()
      .min(10, ({ min }) => `Phone number must be at least ${min} characters`)
      .required("Phone number is required"),
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      var queryString = Object.keys(values)
        .map((key) => {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(values[key])
          );
        })
        .join("&");

      if (!networkConnection) {
        await AsyncStorage.setItem("@saveddata", JSON.stringify(queryString));
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            "Data saved in draft",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert("Data saved in draft");
        }
      } else {
        let getData = await AsyncStorage.getItem("@saveddata");
        const as = JSON.parse(getData);
        // console.log("get", as);
        const { data } = await axios.get(
          `/questionResponse?formId=${forms.formId}&auditorId=${userId}&auditorNumber=${phone_number}&${as}`
        );
        // console.log("getData", data);
        if (Platform.OS === "android") {
          ToastAndroid.showWithGravityAndOffset(
            data.message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            50
          );
        } else {
          AlertIOS.alert(data.message);
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
    // style={{ backgroundColor: "#fff" }}
    >
      <View style={styles.headContainer}>
        <Text style={styles.headTitle}>{forms.formName}</Text>
      </View>
      {/* <Text>{JSON.stringify(formsData, null, 4)}</Text> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.formContainer}
      >
        <Formik
          // validationSchema={formValidationSchema}
          initialValues={initialVars}
          enableReinitialize={true}
          //TODO: add validationScheme/ read about validation scheme and yup
          onSubmit={(values) => handleSubmit(values)}
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
                  {questionsDetails &&
                    questionsDetails.map((questionsDetail) => {
                      return (
                        <>
                          <View key={questionsDetail.questionId}>
                            {questionsDetail.questionType === "Phone" ? (
                              <>
                                <UserPhoneInput
                                  name={questionsDetail.questionDescription}
                                  onChange={handleChange(
                                    questionsDetail.questionId
                                  )}
                                  questionMandatoryOption={
                                    questionsDetail.questionMandatoryOption
                                  }
                                  keyboardType="numeric"
                                  errors={questionsDetail.questionType}
                                />
                              </>
                            ) : questionsDetail.questionType === "Text" ? (
                              <UserTextInput
                                name={questionsDetail.questionDescription}
                                onChange={handleChange(
                                  questionsDetail.questionId
                                )}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                autoCapitalize="words"
                                autoCorrect={false}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Date" ? (
                              <>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                  }}
                                >
                                  <UserDateInput
                                    name={questionsDetail.questionDescription}
                                    id={questionsDetail.questionId}
                                    setFieldValue={setFieldValue}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    errors={questionsDetail.questionType}
                                  />
                                </View>
                              </>
                            ) : questionsDetail.questionType === "Time" ? (
                              <>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    // justifyContent: "space-between",
                                  }}
                                >
                                  <UserTimeInput
                                    name={questionsDetail.questionDescription}
                                    onChange={handleChange(
                                      questionsDetail.questionId
                                    )}
                                    questionMandatoryOption={
                                      questionsDetail.questionMandatoryOption
                                    }
                                    setFieldValue={setFieldValue}
                                    id={questionsDetail.questionId}
                                    autoCorrect={false}
                                    errors={questionsDetail.questionType}
                                  />
                                </View>
                              </>
                            ) : questionsDetail.questionType ===
                              "SingleChoice" ? (
                              <UserSingleSelectInput
                                name={questionsDetail.questionDescription}
                                questionsDetail={questionsDetail}
                                id={questionsDetail.questionId}
                                setFieldValue={setFieldValue}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType ===
                              "MultipleChoice" ? (
                              <UserMultySelectInput
                                setFieldValue={setFieldValue}
                                name={questionsDetail.questionDescription}
                                questionsDetail={questionsDetail}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Number" ? (
                              <UserTextInput
                                name={questionsDetail.questionDescription}
                                onChange={handleChange(
                                  questionsDetail.questionId
                                )}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                keyboardType="numeric"
                                autoCorrect={false}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Location" ? (
                              <UserTextInput
                                name={questionsDetail.questionDescription}
                                onChange={handleChange(
                                  questionsDetail.questionId
                                )}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                autoCapitalize="words"
                                autoCorrect={false}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType ===
                              "SectionBreak" ? (
                              <UserSectionBreakInput
                                name={questionsDetail.questionDescription}
                                questionBreakTitle={
                                  questionsDetail.questionTittle
                                }
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                              />
                            ) : questionsDetail.questionType === "Image" ? (
                              <View>
                                <UserImageInput
                                  name={questionsDetail.questionDescription}
                                  setFieldValue={setFieldValue}
                                  id={questionsDetail.questionId}
                                  errors={questionsDetail.questionType}
                                />
                              </View>
                            ) : questionsDetail.questionType ===
                              "ImageGeoTag" ? (
                              <View>
                                <UserImageInput
                                  name={questionsDetail.questionDescription}
                                  setFieldValue={setFieldValue}
                                  id={questionsDetail.questionId}
                                  errors={questionsDetail.questionType}
                                />
                              </View>
                            ) : questionsDetail.questionType === "Signature" ? (
                              <UserSignatureCaptureInput
                                name={questionsDetail.questionDescription}
                                setFieldValue={setFieldValue}
                                id={questionsDetail.questionId}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Email" ? (
                              <UserTextInput
                                name={questionsDetail.questionDescription}
                                onChange={handleChange(
                                  questionsDetail.questionId
                                )}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                autoCompleteType="email"
                                keyboardType="email-address"
                                autoCorrect={false}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Audio" ? (
                              <UserAudioInput
                                name={questionsDetail.questionDescription}
                                setFieldValue={setFieldValue}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                id={questionsDetail.questionId}
                                autoCorrect={false}
                              />
                            ) : questionsDetail.questionType === "Video" ? (
                              <UserVideoInput
                                name={questionsDetail.questionDescription}
                                setFieldValue={setFieldValue}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                id={questionsDetail.questionId}
                                autoCorrect={false}
                              />
                            ) : questionsDetail.questionType === "Barcode" ? (
                              <UserBarQRCodeInput
                                id={questionsDetail.questionId}
                                name={questionsDetail.questionDescription}
                                setFieldValue={setFieldValue}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType ===
                              "LickerScale" ? (
                              <UserLikertScaletInput
                                name={questionsDetail.questionDescription}
                                likerValue={questionsDetail.likerValue.split(
                                  ","
                                )}
                                id={questionsDetail.questionId}
                                setFieldValue={setFieldValue}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Scale" ? (
                              <UserSliderScaletInput
                                name={questionsDetail.questionDescription}
                                id={questionsDetail.questionId}
                                maximum={Number(questionsDetail.Maximum)}
                                minimum={Number(questionsDetail.Minimum)}
                                setFieldValue={setFieldValue}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Rating" ? (
                              <UserRatingInput
                                name={questionsDetail.questionDescription}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                id={questionsDetail.questionId}
                                setFieldValue={setFieldValue}
                              />
                            ) : questionsDetail.questionType === "Note" ? (
                              <UserNoteInput
                                name={questionsDetail.questionDescription}
                                onChange={handleChange(
                                  questionsDetail.questionId
                                )}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                autoCapitalize="words"
                                autoCorrect={false}
                                errors={questionsDetail.questionType}
                              />
                            ) : questionsDetail.questionType === "Qrcode" ? (
                              <UserBarQRCodeInput
                                id={questionsDetail.questionId}
                                name={questionsDetail.questionDescription}
                                setFieldValue={setFieldValue}
                                questionMandatoryOption={
                                  questionsDetail.questionMandatoryOption
                                }
                                errors={questionsDetail.questionType}
                              />
                            ) : null}
                          </View>
                        </>
                      );
                    })}
                </View>

                <View style={styles.buttonContainer}>
                  <SubmitButton
                    title="Submit"
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
              </>
            );
          }}
        </Formik>

        {/* <Text>{JSON.stringify(questionsDetails, null, 2)}</Text> */}
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
    marginVertical: 20,
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 55,
  },
  headContainer: {
    backgroundColor: colors.secoundary,
    // height: 70,
  },
  headTitle: {
    fontSize: 25,
    color: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
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
