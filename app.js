const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
var fs = require('fs');

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'w' });
var log_stdout = process.stdout;

const app = express();
const socketio = require('socket.io');

app.use(express.json({ limit: '1000mb' }));

app.use(cors(), (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE');
    next();
});

const port = process.env.PORT || 8080;

const expressServer = app.listen(port);


print = function(d) {
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

const io = socketio(expressServer, {
    allowEIO3: true, /// this is to use the latest version
});

io.of('/').on('connection', function(socket, req) {

    // print(socket.id + " is connected");

    console.log(socket.id + " Is connected to the server");
    socket.emit('status', socket.id);

    socket.emit("res", "HEY BRO")

    socket.on('connect_failed', function() {
        // print('Connection Failed');
    });

    socket.on("disconnect", (reason) => {
        // print(reason + " Disconnected")
        console.log("Client Disconnected");
    });
});

app.use('/api/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', authRoutes);