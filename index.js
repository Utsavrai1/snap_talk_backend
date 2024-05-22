import express from "express";
import cors from "cors";
import morgan from "morgan";

import { app, server } from "./socket/socket.js";

// Routes Import
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

//Database Import
import connectToMongoDB from "./db/connect_db.js";

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.send("Welcome to Snaptalk backend");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port http://localhost:${PORT}`);
});
