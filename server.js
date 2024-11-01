import mongoose from 'mongoose';

// console.log('env', import.meta.resolve);

// Вызов node с node--env - file.env server.js

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env || {};

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gai3ieq.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', error => console.error('Не смогли подключиться к базе', error));

import CategoryModel from './src/models/category.js';

try {
    const res = await CategoryModel.create({
        order: 3,
        id: 'y65',
        title: 'My friday meeting',
        description: 'Long text for my test category',
        userId: 't663',
    });

    console.log('res', res);
} catch (err) {
    console.log('err', err);
}

// mongoose
//     .connect(url)
//     .catch(error => console.error('Не смогли подключиться к базе', error))
//     .then(res => {
//         console.log('res', res.connection);
//     });