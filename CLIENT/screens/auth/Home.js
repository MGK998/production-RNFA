import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useContext, useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import FooterMenu from "../../components/Forms/Menus/FooterMenu";
import { PostContext } from "../../context/postContext";
import PostCard from "../../components/PostCard";

function Home() {
  //global state

  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {}, [getAllPosts]);

  //refresh controll
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts;
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <PostCard posts={posts} />
        {/*<Text>{JSON.stringify(state, null, 4)}</Text>*/}
        {/*<Text>{JSON.stringify(posts, null, 4)}</Text>*/}
      </ScrollView>

      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
  },
});

export default Home;
