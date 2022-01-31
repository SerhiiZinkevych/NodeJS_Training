const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const contactsRouter = require('./contacts/contacts.router');

const app = express();

const logFormat = app.get('env') === 'production' ? 'short' : 'dev';

app.use(logger(logFormat));
app.use(cors());
app.use(express.json());

app.use('/api/contacts', contactsRouter);

app.use((req, res) => {
    console.log(req);
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

module.exports = app;
