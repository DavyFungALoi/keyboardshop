import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"


dotenv.config();
connectDB();

const app = express();

app.use(express.json()) ///enables json parsing in the body

app.get("/", (req, res) => {
  res.send("API is running now");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);


/*


app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
})
*/
