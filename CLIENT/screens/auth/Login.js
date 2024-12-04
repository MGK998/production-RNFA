import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function Login({ navigation }) {
  //global state
  const [state, setState] = useContext(AuthContext);

  //states
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  //function

  //btn function
  async function handleSubmit() {
    try {
      setLoading(true);
      if (!email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      //for connecting login screen's data to database
      const { data } = await axios.post(
        "/auth/login", //http://192.168.1.67:8080/api/v1/auth/login shortcut created in authContext
        { email, password }
      );
      setState(data);
      await AsyncStorage.setItem("@auth", JSON.stringify(data));

      alert(data && data.message);
      navigation.navigate("Home");

      console.log("Login Data==>", { email, password });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  }

  //temporary function to check local storage data (async)
  async function getLocalStorageData() {
    let data = await AsyncStorage.getItem("@auth");
    console.log("local storage =>", data);
  }
  getLocalStorageData();

  /*
  useEffect(() => {
    getLocalStorageData(); // Call the function on mount
  }, []);
  */

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox
          inputTitle={"Email"}
          keyboardType="email-address"
          autoComplete="email"
          value={email}
          setValue={setemail}
        />

        <InputBox
          inputTitle={"Password"}
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          setValue={setpassword}
        />
      </View>
      {/*<Text>
          {JSON.stringify(
            { naam: name, Email: email, Password: password },
            null,
            4
          )}
        </Text>*/}
      <SubmitButton
        btnTitle={"Login"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Not a Valid User Please{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Register
        </Text>
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
  },
  inputBox: {
    height: 40,
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: "#af9f85",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "red",
  },
});

export default Login;
