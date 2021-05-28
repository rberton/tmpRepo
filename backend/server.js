const addHeaders = function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

const httpServer = require("http").createServer((request, response, next) => {
  addHeaders(request, response, next);
});

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", async (socket) => {
  console.log("Socket Connected");

  let notifications = [
    {
      title: "I'm a notification !",
    },
  ];

  socket.emit("get-notifications", notifications);

  socket.on("emit-notification", async (data) => {
    notifications = [...notifications, data];

    console.log("emit-notification => notifications:", notifications);

    socket.emit("get-notifications", notifications);
  });
});

httpServer.listen(3001);
