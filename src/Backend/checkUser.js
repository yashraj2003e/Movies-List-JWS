const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const filePath = path.join(__dirname, "./movies.txt");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkuser", (req, res) => {
  try {
    let usercreds = req.body.username + "\n" + req.body.password;
    console.log(usercreds);
    fs.writeFileSync(filePath, usercreds);
    const childProcess = spawn("node", ["./checkUserHelper.js"]);

    childProcess.stdout.on("data", (data) => {
      res.json(`${data}`[0]);
    });

    childProcess.stderr.on("data", (data) => {
      res.json(-1);
    });
  } catch (error) {
    console.log(error);
    res.json(-2);
  }
});

app.get("/test", (req, res) => {
  res.send("Server is running");
});

app.listen(8082, () => console.log("Server is running on port 8082 !"));
