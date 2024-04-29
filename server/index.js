import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import UserModel from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/company");

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  UserModel.create({ username, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign(
            { email: email },
            "new-media-channel-access-secret",
            {
              expiresIn: 60,
            }
          );
          const refreshToken = jwt.sign(
            { email: email },
            "new-media-channel-refresh-secret",
            {
              expiresIn: 300,
            }
          );
          res.cookie("accessToken", accessToken, { maxAge: 60000 });
          res.cookie("refreshToken", refreshToken, {
            maxAge: 300000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
          });
          return res.json({ Login: true });
        } else {
          res.json("Invalid email or password");
        }
      } else {
        res.json({ Login: false, Message: "User not found" });
      }
    })
    .catch((err) => res.json(err));
});

const varifyedUser = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if (!accesstoken) {
    if (reToken(req, res)) {
      next();
    }
  } else {
    jwt.verify(
      accesstoken,
      "new-media-channel-access-secret",
      (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: "There is Invalid Token" });
        } else {
          req.email = decoded.email;
          next();
        }
      }
    );
  }
};

const reToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, message: "Doesn't have Refresh token" });
  } else {
    jwt.verify(
      refreshtoken,
      "new-media-channel-refresh-secret",
      (err, decoded) => {
        if (err) {
          return res.json({ valid: false, message: "Invalid Refresh Token" });
        } else {
          const accessToken = jwt.sign(
            { email: decoded.email },
            "new-media-channel-access-secret",
            { expiresIn: "1m" }
          );
          res.cookie("accessToken", accessToken, { maxAge: 60000 });
          exist = true;
        }
      }
    );
  }
  return exist;
};

app.get("/dash", varifyedUser, (req, res) => {
  return res.json({
    valid: true,
    message: "you have been Authrized in newMedia:)",
  });
});

app.listen(3001, () => {
  console.log("NewMedia server is runnig");
});
