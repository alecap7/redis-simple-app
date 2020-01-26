// refs https://www.sitepoint.com/using-redis-node-js/

const redis = require("redis");

// CLIENT SETUP ----------------------------------------------------------------

console.log("Connetting redis..");

// Create new client
const client = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST
);

client.on("connect", function() {
  console.log("connected");
});

// BASIC OPS -------------------------------------------------------------------

// Store a string
client.set("string_key", "string_value", function(err, reply) {
  console.log("Storing simple string..");
  console.log(reply);
});

// You can also give an expiration time.. client.expire("string_key", 30);

// Get the string
client.get("string_key", function(err, reply) {
  console.log("Getting stored string..");
  console.log(reply);
});

// OBJECT BASIC OPS ------------------------------------------------------------

client.hmset(
  "object",
  {
    prop1: "prop_1",
    prop2: "prop_2",
    prop3: "prop_3"
  },
  function(err, reply) {
    console.log("Storing object..");
    console.log(reply);
  }
);

client.hgetall("object", function(err, object) {
  console.log("Getting stored object..");
  console.log(object);
});

// LIST BASIC OPS --------------------------------------------------------------

client.rpush(["list_key", "list_item_0", "list_item_1"], function(err, reply) {
  console.log("Storing list of size..");
  console.log(reply); //prints 2
});

client.lrange("list_key", 0, -1, function(err, reply) {
  console.log("Getting stored list..");
  console.log(reply); // ["list_item_0", "list_item_1"]
});

// SET BASIC OPS ---------------------------------------------------------------

// Sets are similar to lists, but the difference is that they don’t allow duplicates

client.sadd(["set_key", "set_item_0", "set_item_1", "set_item_2"], function(
  err,
  reply
) {
  console.log("Storing set of size..");
  console.log(reply); // 3
});

client.smembers("set_key", function(err, reply) {
  console.log("Getting stored set..");
  console.log(reply);
});

// Checking the Existence of Keys ----------------------------------------------

client.exists("key", function(err, reply) {
  console.log("Does 'key' exists?");
  if (reply === 1) {
    console.log("exists");
  } else {
    console.log("doesn't exist");
  }
});

client.exists("set_key", function(err, reply) {
  console.log("Does 'set_key' exists?");
  if (reply === 1) {
    console.log("exists");
  } else {
    console.log("doesn't exist");
  }
});

// Deleting and Expiring Keys --------------------------------------------------

client.del("list_key", function(err, reply) {
  console.log("Deleting 'list_key'..");
  console.log(reply ? "OK" : "wtf?!");
});

client.del("set_key", function(err, reply) {
  console.log("Deleting 'set_key'..");
  console.log(reply ? "OK" : "wtf?!");
});

// Incrementing and Decrementing -----------------------------------------------

client.set("incr_key", 10, function() {
  console.log("Incrementing 'incr_key'..");
  client.incr("incr_key", function(err, reply) {
    // ..or incrby, decr, decrby..
    console.log(reply); // 11
  });
});
