const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const initRouter = require("./router");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

connectDB();
initRouter(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
