import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async () => {
  try {
    let data = await AsyncStorage.getItem("@auth");
    const as = JSON.parse(data);

    // return as.refresh_token;
    return as;
  } catch (error) {
    console.log("Error getting the auth token", error);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token;
};

export default { getToken, getUser };
