import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: [
      process.env.CORS_ORIGIN,
      "http://localhost:5173",
      "http://localhost:8000",
    ],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  }) //it is middileware that allows  to enable cross-origin resource sharing which is necessary when your front-end and back-end are on different domains.
);
app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import playlistRouter from "./routes/playlist.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/playlist", playlistRouter);
export { app };
