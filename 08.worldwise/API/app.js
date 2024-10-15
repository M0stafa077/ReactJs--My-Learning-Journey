import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const data = JSON.parse(fs.readFileSync("./cities.json"));

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/", (req, res) => {
    setTimeout(() => {
        res.json(data.cities);
    }, 800);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
