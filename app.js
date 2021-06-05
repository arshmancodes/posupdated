const express = require('express');
const app = express();

app.use(express.json({ limit: '1000mb' }));

app.use(cors(), (req, res, next) => {
    next();
});

app.use('/auth', authRoutes);


app.listen(8080, () => console.log(`Server listening on port ${PORT}`));