import express = require("express");

let posts = require("../db/posts.json");

const app: express.Application = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, content-type, Content-Type, x-auth"
  );
  next();
});

app.get("/", (req, res) => res.send("Blog API"));

app.get("/posts", (req, res) => res.send(posts));

app.put("/posts/:id", (req, res) => {
  const { id, title, datePosted, categories, content } = req.body;
  const tempPosts = posts.forEach((post: any) => {
    if (post.id == req.params.id) {
      post.id = id;
      post.title = title;
      post.id = datePosted;
      post.id = categories;
      post.id = content;
    }
  });
});

app.get("/posts/:id", (req, res) => {
  const tempPosts = posts.filter((post: any) => req.params.id == post.id);
  if (tempPosts.length > 0) {
    res.send(tempPosts[0]);
  } else {
    res.status(404).send("Post not found!");
  }
});

app.post("/posts", (req, res) => {
  const { id, title, datePosted, categories, content } = req.body;
  if (
    id &&
    title &&
    datePosted &&
    categories &&
    categories.length !== 0 &&
    content
  ) {
    posts.push({ id, title, datePosted, categories, content });
    res.send("Post successfully added.");
  } else res.status(400).send("Can not add post!");
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((post: any) => req.params.id != post.id);
  res.send("POst successfully deleted.");
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
