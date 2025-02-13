const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Database/db");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization,x-auth-token",
    credentials: "true",
    preflightContinue: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

const authRoutes = require("./Routes/auth");
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));