import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import EditModal from "./EditModal";

function PostCard({ posts, myPostScreen }) {
  //this{posts} is from both context and Myposts.js file

  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  function handleDeletePrompt(id) {
    Alert.alert("Attention", "Are You sure, you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("cancel press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  }

  //delete post or user data
  async function handleDeletePost(id) {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  }
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {myPostScreen && (
        <EditModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}
      {posts?.map((item, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text style={{ marginHorizontal: 20 }}>
                <FontAwesome5
                  name="pen"
                  size={18}
                  color={"darkblue"}
                  onPress={() => {
                    setPost(item), setModalVisible(true);
                  }}
                />
              </Text>

              <Text>
                <FontAwesome5
                  name="trash"
                  size={18}
                  color={"red"}
                  onPress={() => handleDeletePrompt(item?._id)}
                />
              </Text>
            </View>
          )}

          <Text style={styles.title}>Title: {item?.title}</Text>
          <Text style={styles.desc}>
            Description:{"\n"}
            {item?.description}
          </Text>
          <View style={styles.footer}>
            {item?.postedBy?.name && (
              <Text>
                <FontAwesome5 name="user" color={"green"} /> PostedBy:{" "}
                {item?.postedBy?.name}
              </Text>
            )}

            <Text>
              <FontAwesome5 name="clock" color={"orange"} /> CreatedAt:{" "}
              {moment(item?.createdAt).format("DD:MM:YYYY")}{" "}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
  },
  card: {
    width: "97%",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
