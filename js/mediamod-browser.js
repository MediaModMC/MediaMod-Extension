// Start a new connection to the MediaMod Server
var socket = io.connect("http://localhost:1338/")
socket.on("connect", function () {
    console.log("Connected to MediaMod")
})