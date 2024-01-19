const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    optionSuccessStatus: 200,
    Headers: true,
    credentials: true,
    origin: true,
    exposedHeaders: "Set-Cookie",
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Content-Type",
      "Authorization",
    ],
  })
);

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`Welcome to Snap Talk Backend`);
});

app.listen(PORT, () => {
  console.log(`Server rocking on ${PORT}`);
});

app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

app.use(morgan("dev"));

require("./database/conn");

//Swagger Api Config

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Snap Talk API",
      version: "1.0.0",
      description: "RentApp Apis",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./router/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//All Routers

const authRouter = require("./router/userAuthRouter");
app.use("/api/auth", authRouter);
