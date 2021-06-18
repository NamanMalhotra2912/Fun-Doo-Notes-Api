/**
 * 
 * @description creating redis database config for connectiong redis cache server.
 */
const redis = require("redis");
const client = redis.createClient();
client.on("error", function (error) {
    console.error("Error encounterd : ".error);
});
client.on("Connect", function (error) {
    console.log("Redis Connection established");
});