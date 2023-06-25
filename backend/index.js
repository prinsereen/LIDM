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

const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();

app.use(
  cors()
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

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chatGpt", async (req, res) => {
  try {
    const prompt = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 1,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      text: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

store.sync();

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("server up and running");
});
