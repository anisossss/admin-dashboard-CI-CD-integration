require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const http = require("http");
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
};
const adminRouter = require("./src/api/routes/adminRouter");

const app = express();
const server = http.createServer(app);
connectDB();
app.use(
  bodyParser.json({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);

app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("ADMIN DASHBOARD BACKEND server running  ✅");
});

app.use("/api/admin", adminRouter);

const port = process.env.PORT || 4402;
server.listen(port, () => {
  console.log("info", `Listening on  test ${port}`);
});
