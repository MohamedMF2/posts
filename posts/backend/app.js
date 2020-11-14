const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Post = require("./models/post");

// *********** Connection to Database ***********

//db password  3ia1TwiiI6DWiASV
// database as a serveice mongodb cloud
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(
    "mongodb+srv://fouad:3ia1TwiiI6DWiASV@authentication.dxlco.mongodb.net/node-angular?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected to Database "))
  .catch(() => console.log("connection failed "));

// important for post request - alternative for depracated body-parser package
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//important milddlewares for CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

// Routes
app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    console.log(documents);
    res.status(200).json({
      message: "posts fetched successfully",
      posts: documents,
    });
  });
});

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });

  post.save();
  res.status(201).json({
    message: "post added successfully!",
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "post deleted!" });
  });
});

module.exports = app;
