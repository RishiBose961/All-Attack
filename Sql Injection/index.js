// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";


const app = express();
app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: false }));

import userRoutes from "./routes/user.routes.js"
import cardRoutes from "./routes/card.routes.js"

// app.get("/users", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post("/users", async (req, res) => {
//   const user = await prisma.user.create({ data: req.body });
//   res.status(201).json(user);
// });

app.use("/user", userRoutes);
app.use("/card", cardRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
