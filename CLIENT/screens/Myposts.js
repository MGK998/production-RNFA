import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import FooterMenu from "../components/Forms/Menus/FooterMenu";
import axios from "axios";
import PostCard from "../components/PostCard";

function Myposts() {
  //state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //get user post
  async function getUserPosts() {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-post");
      setLoading(false);
      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  }

  //initial

  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        {/*<Text>{JSON.stringify(state, null, 4)}</Text>*/}
        {/*<Text>{JSON.stringify(posts, null, 4)}</Text>*/}
        <PostCard posts={posts} myPostScreen={true} />
        {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
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

export default Myposts;
