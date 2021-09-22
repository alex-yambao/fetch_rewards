require("dotenv").config();
const express = require("express");
const server = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const morgan = require("morgan");
const apiRouter = require("./routes");

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use("/api", apiRouter);

server.use((error, res) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    name: error.name,
    message: error.message,
  });
});

server.listen(PORT, () => {
  console.log(`Server is up on PORT ${PORT}`);
});
