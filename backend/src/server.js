import express from "express";
import connection from "./config/connectionDb";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/homePage";
import cors from "cors";
import initApiRoutes from "./routes/apiRoute";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  // optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// config body paster
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// config cookie parser
configViewEngine(app);

//test connection db
connection();

// init routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(8000, () => {
  console.log("sever run on success");
});
