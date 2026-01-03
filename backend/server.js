import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config.js'
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors({
    origin: [
      "http://localhost:5173",
      "https://easy-food-blond.vercel.app",
      "https://easy-food-73tr.vercel.app"
    ],
    credentials: true,
  }
));

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter);
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter);

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
});