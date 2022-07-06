import express from "express";

const ParseServer = require("parse-server").ParseServer;

const config = {
  databaseURI: "mongodb://localhost:27017",
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js",
  appId: process.env.APP_ID || "myAppId",
  masterKey: process.env.MASTER_KEY || "", //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || "http://localhost:1337/parse", // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Users", "Categories", "Cards"], // List of classes to support for query subscriptions
  },
};

const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || "/parse";

const api = new ParseServer(config);
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get("/", function (req, res) {
  res
    .status(200)
    .send(
      "I dream of being a website.  Please star the parse-server repo on GitHub!"
    );
});

const port = process.env.PORT || 1337;

const httpServer = require("http").createServer(app);
httpServer.listen(port, function () {
  console.log("parse-server-example running on port " + port + ".");
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

module.exports = {
  app,
  config,
};