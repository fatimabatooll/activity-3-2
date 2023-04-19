import classes from "./BlogPosts.module.css";

function BlogPosts({ posts }) {
  return (
    <ul classes={classes.list}>
      {posts.reverse().map((post) => (
        <li key={posts.id}>{post.title}</li>
      ))}
    </ul>
  );
}

export default BlogPosts;
