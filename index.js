import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import categoriesRouter from './src/routes/categories.js';
import authRouter from './src/routes/auth.js';
import itemsRouter from './src/routes/items.js';

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env || {};

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gai3ieq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', error => console.error('Не смогли подключиться к базе', error));

const app = express();
const PORT = 3000;

app.use(cors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(categoriesRouter);
app.use(itemsRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});