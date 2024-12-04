import { View, Text } from "react-native";
import React from "react";
import { AuthProvider } from "./context/authContext";
import ScreenMenu from "./components/Forms/Menus/ScreenMenu";
import { PostProvider } from "./context/postContext";

function RootNavigation() {
  return (
    <AuthProvider>
      <PostProvider>
        <ScreenMenu />
      </PostProvider>
    </AuthProvider>
  );
}

export default RootNavigation;
