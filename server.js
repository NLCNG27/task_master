const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

// serve static files from the react app in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Routes
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
