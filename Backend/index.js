// import express from 'express';
// import dotenv from 'dotenv';
// dotenv.config();
// import { connect } from 'mongoose';
// import connectDb from './config/db.js';
// import cookieParser from 'cookie-parser';
// import authRouter from './routes/auth.routes.js';
// // import mongoose from 'mongoose';
// // import authRoute from './routes/auth.js';
// import cors from 'cors';

// const app= express();

// const port= process.env.PORT || 8000;


// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/auth",authRouter)
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials:true,

// }))
// app.listen(port,()=>{
//     connectDb();
//     console.log(`server is running at port ${port}`);
// })

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import { shopRouter } from './routes/shop.route.js';
import "./model/item.model.js";
import "./model/shop.model.js";


import itemsRouter from './routes/items.router.js';


const app = express();
const port = process.env.PORT || 4000;

// app.use(cors({
//   origin: "http://localhost:5173",  // ⚠️ no space here
//   credentials: true,
// }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
console.log("JWT_SECRET =", process.env.JWT_SECRET);



app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use('/api/shop',shopRouter);
app.use("/api/items",itemsRouter)
app.get('/', (req, res) => {
  res.send('Welcome to the Vengo API');
});

app.listen(port, () => {
  connectDb();
  console.log(`✅ Server is running at port ${port}`);
});

