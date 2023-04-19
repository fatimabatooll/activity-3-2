import React, { useState, useEffect } from "react";
import BlogPosts from "./components/BlogPosts";
import NewPost from "./components/NewPost";
import { act } from "@testing-library/react";

function App() {
  // Todo: Fetch blog posts from https://jsonplaceholder.typicode.com/posts (see documentation on https://jsonplaceholder.typicode.com/guide/)
  // Pass fetched posts to <BlogPost /> via props & output the posts in that component
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts").then((res) => {
      res.json().then((response) => {
        act(() => {
          setPost(response);
          setIsLoading(false);
        });
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePost = (newPost) => {
    act(() => {
      setPost([...post, newPost]);
    });
  };

  return (
    <>
      <NewPost handlePost={handlePost} />
      {isLoading ? <p>Loading...</p> : <BlogPosts posts={post} />}
    </>
  );
}

export default App;
