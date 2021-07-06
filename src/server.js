const app = require("./app");

const initExpress = () => {
  const PORT = process.env.SERVER_PORT;
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.on("error", (appErr, appCtx) => {
    console.error("server error", appErr.stack);
  });

  process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection shutting down");
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM. Shutting down the server gracefully");
    server.close(() => {
      console.log("Server terminated");
    });
  });
};

initExpress();