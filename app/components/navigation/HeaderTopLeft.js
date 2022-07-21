import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
// import { AuthContext } from "../../context/authContext";
import { useNavigation } from "@react-navigation/native";
import colors from "../../config/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import SubmitButton from "../Button/SubmitButton";
import OffLineButton from "../Button/OffLineButton";

function HeaderTopLeft({ icon, name, onPress }) {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  // const [state, setState] = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAlert = async () => {
    setModalVisible(!isModalVisible);
    // navigation.navigate("Home");
  };

  return (
    <>
      <TouchableOpacity onPress={handleAlert}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} size={25} color={colors.white} />
        </View>
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View
          style={{
            height: 200,
            color: colors.white,
            backgroundColor: colors.white,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              marginVertical: 20,
              marginHorizontal: 10,
              flexDirection: "row",
            }}
          >
            <Icon name="alert-circle-outline" color={colors.primary} />
            <Text style={styles.text}>
              Are you sure want to leave the form?
            </Text>
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={[styles.text, { color: colors.medium, fontWeight: "300" }]}
            >
              Save as draft if you want to complete this response later.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <View>
              <TouchableOpacity onPress={toggleModal} style={styles.button}>
                <Text style={styles.buttonText}>Discard</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={toggleModal} style={styles.button}>
                <Text style={styles.buttonText}>Save to Draft</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

export default HeaderTopLeft;

const styles = StyleSheet.create({
  iconContainer: {
    marginLeft: 25,
    flexDirection: "row",
  },

  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: 130,
    marginVertical: 25,
    marginHorizontal: 2,
  },
  text: {
    fontSize: 18,
  },
  buttonText: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
