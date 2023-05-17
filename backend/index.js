import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv"
import db from "./config/Database.js";
import sequelizeStore from "connect-session-sequelize"
import UserRoute from "./routes/UserRoute.js";
import UnverifiedFileRoute from "./routes/FileRoute.js"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config();

const app = express();

const sessionStore = sequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

/* (async()=>{
    await db.sync();
})(); 
 */
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(express.json());
app.use(UserRoute);
app.use(UnverifiedFileRoute);
app.use(AuthRoute);

/* store.sync() */

app.listen(process.env.APP_PORT, ()=> {
    console.log('server up and running');
});