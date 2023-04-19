import { useState } from "react";
import classes from "./NewPost.module.css";
import { act } from "@testing-library/react";

function NewPost({ handlePost }) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [saving, setSavig] = useState("Save");

  function updateTitleHandler(event) {
    setEnteredTitle(event.target.value);
  }

  const submitHandler = async (event) => {
    setSavig("Saving...");
    event.preventDefault();
    // Todo: Handle the creation of new posts and send new post data to https://jsonplaceholder.typicode.com/posts (via a POST) request
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 10000) + 1,
      title: enteredTitle,
      body: "hy",
    };
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        act(() => {
          handlePost(value);
          setEnteredTitle("");
          setSavig("Save");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div>
        <label>Title</label>
        <input type="text" onChange={updateTitleHandler} value={enteredTitle} />
      </div>
      <button>{saving}</button>
    </form>
  );
}

export default NewPost;
