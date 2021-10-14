const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const promoRoutes = require('./routes/promoRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const expensesRoutes = require('./routes/expensesRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const rawitemsRoutes = require('./routes/rawItemRoutes');
const accountsRoutes = require('./routes/accountsRoutes');
const ledgerRoutes = require('./routes/ledgerRoutes');
const revenueRoutes = require('./routes/revenueRoutes');


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

    socket.on('connect_failed', function() {
        // print('Connection Failed');
    });

    socket.on('category_uploaded', function(val) {
        // print('Connection Failed');
        io.emit('listen_category', true);
    });

    socket.on('product_uploaded', function(val) {
        // print('Connection Failed');
        io.emit('listen_product', true);
    });


    socket.on('promo', function(val) {
        // print('Connection Failed');
        io.emit('promo', true);
    });

    socket.on('employees', function(val) {
        // print('Connection Failed');
        io.emit('employees', true);
    });
    socket.on('expenses', function(val) {
        // print('Connection Failed');
        io.emit('expenses', true);
    });

    socket.on('balance', function(val) {
        // print('Connection Failed');
        io.emit('balance', true);
    });

    socket.on('listen_raw', function(val) {
        // print('Connection Failed');
        io.emit('listen_raw', true);
    });

    socket.on('listen_accounts', function(val) {
        // print('Connection Failed');
        io.emit('listen_accounts', true);
    });

    socket.on('transactions', function(val) {
        // print('Connection Failed');
        io.emit('transactions', true);
    });

    socket.on('customers', function(val) {
        // print('Connection Failed');
        io.emit('customers', true);
    });

    socket.on('cashier', function(val) {
        // print('Connection Failed');
        io.emit('cashier', true);
    });

    socket.on("disconnect", (reason) => {
        // print(reason + " Disconnected")
        console.log("Client Disconnected");
    });
});

app.use('/api/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes)
app.use('/api/promo', promoRoutes)
app.use('/api/employee', employeeRoutes)
app.use('/api/expenses', expensesRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/rawitems', rawitemsRoutes)
app.use('/api/accounts', accountsRoutes)
app.use('/api/ledgers', ledgerRoutes)
app.use('/api/revenue', revenueRoutes)