import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

//Context

const PostContext = createContext();

function PostProvider({ children }) {
  //Global State

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  async function getAllPosts() {
    setLoading(true);
    try {
      const { data } = await axios.get("/post/get-all-post");
      setLoading(false);
      setPosts(data?.posts);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //initial posts
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
}

export { PostContext, PostProvider };
