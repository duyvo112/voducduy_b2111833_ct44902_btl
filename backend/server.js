const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const initRouter = require("./router");
const app = express();
const port = 3000;
const path = require("path");
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
initRouter(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
