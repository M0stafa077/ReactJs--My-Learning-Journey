import express from "express";
import fs from "fs";
import cors from "cors";
import { randomBytes } from "crypto";

const app = express();
const data = JSON.parse(fs.readFileSync("./cities.json"));

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
    setTimeout(() => {
        res.json(data.cities);
    }, 800);
});
app.post("/add-new", (req, res) => {
    const newCityData = req.body;
    newCityData.id = parseInt(randomBytes(4).toString("hex"), 16);
    data.cities.push(newCityData);
    fs.writeFileSync("./cities.json", JSON.stringify(data));
    res.status(201);
});
app.get("/:id", (req, res) => {
    const result = data.cities.filter((city) => {
        return city.id == Number(req.params.id);
    });
    if (result.length === 0) res.status(404).send("Wrong city id");
    res.json(result[0]);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
