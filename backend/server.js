const express = require("express");
const cors = require("cors");
const path = require("path");
const { userRouter } = require("./routers/userRouter");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const postRouter = require("./routers/postRouter");

const PORT = 8000;
connectDb();

const app = express();
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../frontend/build")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/conofacts/users", userRouter);
app.use("/conofacts/posts", postRouter);

app.use(errorHandler);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
