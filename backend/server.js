import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); ///enables json parsing in the body


app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
//making the upload folder static


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*"),
    (req,
    res) =>
      res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
} else {
  app.get("/", (req, res) => {
    res.send("API is running now");
  });
}

///getting stuff ready for production
///making dirname work with es6 modules

//making the upload folder static

app.use(notFound);
app.use(errorHandler);

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
