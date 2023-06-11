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
import CompetitionRoute from "./routes/CompetitionRoute.js"
// const PDFDocument = require("pdfkit");

dotenv.config();

const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

/*  (async () => {
   await db.sync();
 })(); */

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

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
app.use(UserRoute);
app.use(UnverifiedFileRoute);
app.use(AuthRoute);
app.use(SummaryRoute);
app.use(LeeaderBoardRoute);
app.use(CompetitionRoute)


/* store.sync() */

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running");
});
