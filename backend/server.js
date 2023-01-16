const express = require("express");


const { userRouter } = require("./routers/userRouter");
const connectDb = require("./config/Db");


const PORT = 8000;
connectDb();

const app = express();

app.use('/conofacts/users', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server is runing on port ${PORT}`)
})