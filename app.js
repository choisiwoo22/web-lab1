const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, resp) => {
  resp.json({ message: "xin chao ban den voi ung dung quan li danh ba!" });
});

module.exports = app;
