//require('dotenv').config({ path: './env' }) // inconsistency somewhere require somewhere import

import connectDB from "./src/db/index.js";
import dotenv from "dotenv";
import { app } from "./src/app.js";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.error("mongo db connection failed", error);
  });

/*
(async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("error:", error)
            throw error

        })
        app.listen(process.env.PORT, () => {
            console.log(`app is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error : ", error)
        throw error
    }
})()*/
