const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const filePath = path.join(__dirname, "./movies.txt");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/saveList", (req, res) => {
  try {
    fs.writeFile(filePath, "", (e) => console.log("Could't Save"));
    fs.writeFileSync(filePath, req.body.movies);
    const childProcess = spawn("node", ["./writeMoviesHelper.js"]);

    childProcess.stdout.on("data", (data) => {
      res.json(1);
      console.log("ok");
    });

    childProcess.stderr.on("data", (data) => {
      res.json(-1);
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/test", (req, res) => {
  res.send("Server is running");
});

app.listen(8081, () => console.log("Server is running on port 8081 !"));
