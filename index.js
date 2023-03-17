import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import adminRouter from "./admin/routes/user.js";
import userRouter from "./users/routes/user.js";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const port = 8000;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => console.log(`server running on port ${port}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
    res.send("Welcome to tour API");
});
app.use("/public", express.static(path.join(__dirname, "public")));
const storage = multer.diskStorage({
    destination: "./public/images",
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    },
});

const diskStorage = multer({ storage: storage });

app.post("/imageupload", diskStorage.single("image"), async (req, res) => {
    try {
        // console.log(req.file); // File which is uploaded in /uploads folder.
        // console.log(req.body); // Body
        res.send({ path: req.file.path });
    } catch (error) {
        res.status(500).send("Error");
    }
});
