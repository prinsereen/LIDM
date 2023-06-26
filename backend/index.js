import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import UnverifiedFileRoute from "./routes/FileRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import SummaryRoute from "./routes/SummaryRoute.js";
import LeeaderBoardRoute from "./routes/LeaderBoardRoute.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const app = express();

// Allow CORS for specific origins
const allowedOrigins = [
  "http://localhost:5000",
  "http://localhost:5173",
  "https://literatur.up.railway.app",
  "https://literatur.netlify.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    allowedHeaders: ["Content-Type"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "http://localhost:5000",
//       "http://localhost:5173",
//       "https://literatur-production.up.railway.app",
//     ],
//     allowedHeaders: ["Content-Type"],
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//   })
// );

// router.get("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "PUT, POST, GET, DELETE, PATCH, OPTIONS"
//   );
// });

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(express.json());

app.options("/users/:id", cors());
app.options("/userrec/:id", cors());
app.use(UserRoute);
app.use(UnverifiedFileRoute);
app.use(AuthRoute);
app.use(SummaryRoute);
app.use(LeeaderBoardRoute);

store.sync();

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  next();
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("server up and running");
});
