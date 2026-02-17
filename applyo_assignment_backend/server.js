import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import index_router from "./routes/index.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", index_router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
    socket.on("joinPoll", (pollId) => {
    socket.join(pollId);
    console.log(`Joined poll room: ${pollId}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


app.set("io", io);


server.listen(3000, () => {
  console.log("Listening on 3000");
});