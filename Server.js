import "dotenv/config";
import http from "http";
import connectDB from "./config/mongoose.connection.js";
import app from "./app.js";
connectDB();

const server = http.createServer(app);

server.listen(3000, () => {
  console.log("It runnig on 3000 Port!");
});
