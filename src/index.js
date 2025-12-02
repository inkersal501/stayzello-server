import express from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { PORT, MONGODB_URI, APP_URL } from "./config.js";
import mongoose from "mongoose";
import routes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(compression());
app.use(cors({origin: APP_URL, credentials: true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    console.log("Hello from Stayzello");
});
app.use("/api", routes);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("DB Connected")).then(()=>{
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  })
  .catch((error) => console.log("Error connecting to DB:", error));

