const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(express.json({ limit: '1000mb' }));

app.use(cors(), (req, res, next) => {
    next();
});

app.use('/api/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', authRoutes);

app.listen(8080, () => console.log(`Server listening on port 8080`));