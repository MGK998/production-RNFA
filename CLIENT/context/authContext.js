import react, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//context

const AuthContext = createContext();

//provider
function AuthProvider({ children }) {
  //global state
  const [state, setState] = useState({
    user: null,
    token: "",
  });

  //initial local storage data
  useEffect(() => {
    async function loadLocalStorageData() {
      let data = await AsyncStorage.getItem("@auth");
      let loginData = JSON.parse(data); //this parse will convert the data in data to objects
      setState({ ...state, user: loginData?.user, token: loginData?.token }); //loginData && loginData.user
    }
    loadLocalStorageData();
  }, []);

  //default axios setting or shortcut url and token
  axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
  //axios.defaults.baseURL = "http://192.168.1.73:8080/api/v1"; this for terminal server
  axios.defaults.baseURL =
    "https://react-native-server-nj8y.onrender.com/api/v1"; //this is for render/net ma host garna

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthProvider };
