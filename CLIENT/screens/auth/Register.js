import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import InputBox from "../../components/Forms/InputBox";
import SubmitButton from "../../components/Forms/SubmitButton";
import axios from "axios";

function Register({ navigation }) {
  //states
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  //function

  //btn function
  async function handleSubmit() {
    try {
      setLoading(true);
      if (!name || !email || !password) {
        Alert.alert("Please Fill All Fields");
        setLoading(false);
        return;
      }

      setLoading(false);
      //for connecting register screen's data to database
      const { data } = await axios.post(
        "/auth/register", //http://192.168.1.67:8080/api/v1/auth/login shortcut created in authContext
        {
          name: name,
          email: email,
          password: password,
        }
      );
      alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==>", {
        name,
        email,
        password,
      });
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        <InputBox inputTitle={"Name"} value={name} setValue={setname} />

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
        btnTitle={"Register"}
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}>
        Already Register Please{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          LOGIN
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

export default Register;
