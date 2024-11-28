import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import reviewRoute from "./routes/reviewsRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to Book Review System");
});

app.use("/reviews", reviewRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App conneted to database.");

    app.listen(PORT, () => {
      console.log("App is listening to port: " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
