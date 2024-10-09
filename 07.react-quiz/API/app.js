import express from "express";
import fs from "fs";
import cors from "cors";

const data = JSON.parse(fs.readFileSync("questions.json", "utf8"));
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.json(data.questions);
});

app.listen(4000, () => {
    console.log("Running on port 4000");
});
