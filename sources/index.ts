import Client from "./structures/client";
new Client().start();

process.on("uncaughtException", function(error) {
    console.log(error);
});