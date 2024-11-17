import express from 'express';
import mongoose from 'mongoose';
import { getCategories } from './src/methods/category.js';

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env || {};

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gai3ieq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', error => console.error('Не смогли подключиться к базе', error));

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/categories', async (req, res) => {
    const data = await getCategories('userId63324');
    res.send(data);
});

app.get('/home', (req, res) => {
    res.send({
        "name": "Petr",
        "age": 30
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});