// The index.js file of your application
var dt = require("./myFirstModule.js");
var http = require("http");
http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("The date and time are currently: " + dt.myDateTime() + "\n");

    res.end("Hello World again!");
}).listen(8082, function () {
    console.log("Node server is running...");
});