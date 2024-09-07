const app = require("./app");
const config = require("./config");
const MongoDB = require("./Utils/mongodb.util");

async function startServer() {
  try {
    await MongoDB.connect(config.db.uri);
    console.log("Kết nối thành công với MongoDB");

    const POST = config.app.port;

    app.listen(POST, () => {
      console.log(`server is running on port ${POST}`);
    });

  } catch (error) {
    console.log("Không thể kết nối tới MongoDB", error);
    process.exit();
  }
}

startServer();