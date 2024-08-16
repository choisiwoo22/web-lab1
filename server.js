const app = require("./app");

const config = require("./config");

const POST = config.app.port;

app.listen(POST, () => {
  console.log(`server is running on port ${POST}`);
});
