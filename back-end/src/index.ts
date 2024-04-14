import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from 'express'
import { connect, set } from 'mongoose';
import Connect from "./config/database";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";
import SessionDataUser from "./interfaces";
import apiRoutes from "./routes";
import { errorRes } from "./helper/apiResponse";
import { HttpStatusCode } from "./interfaces/httpstatus";

const MongoDBStore = require('connect-mongodb-session')(session);

const logFormat =
  ":method :url :status :response-time ms - :res[content-length]";
  declare module "express-session" {
    interface SessionData {
      user: SessionDataUser;
    }
  }

const app = express()
const server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});
io.on("connection", function (socket:any) {
  console.log("A user connected");

  socket.on("joinRoom", ({ senderId, roomId }:any) => {
    socket.join(roomId);
    console.log(`User ${senderId} joined room ${roomId}`);
  });

  socket.on("sendMessage", function ({ roomId, message, senderId }:any) {
    console.log(message);
    
    io.to(roomId).emit("receiveMessage", { senderId, message });
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/chatApp", 
    collection: 'sessions',
    ttl: 3 * 30 * 24 * 60 * 60 * 1000,
    autoRemove: 'native'
  });
app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.options("*", cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(morgan(logFormat));
  app.use(
    session({
      secret: "secretKey", // Replace with your secret key for session encryption process.env.SECRET_KEY
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // 3 months in milliseconds
        sameSite: true,
        httpOnly: false,
      },
     store
    })
  );
  app.use("/api/v1", apiRoutes);
//   app.use("/", async (req: any, res, next) => {
//     res.status(400).json({
//       message:
//         "Issue with API Route Or Method" + Date.now() + " " + "ds",
//     });
//   });
  app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      console.error(err);
      return errorRes(res, "Bad request", HttpStatusCode.BAD_REQUEST);
    }
  
    next();
  });

const {  SERVER_PORT } = process.env;
console.log(SERVER_PORT);
Connect().then(()=>{ 
  server.listen(SERVER_PORT, () => {
        console.log(`App listening at http://localhost:${SERVER_PORT}`)
      })
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})



