import { Schema, model } from 'mongoose';
import { OrderType } from './common.js';

const BookmarkSchema = new Schema({
    url: {
        type: String,
        required: [true, 'Enter the url'],
    },
    title: String,
    description: String,
    userId: String,
    categoryId: String,
    order: OrderType,
    image: String,
});

export default model('BookmarkModel', BookmarkSchema);