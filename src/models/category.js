import { Schema, model } from 'mongoose';
import { OrderType } from './common.js';

const CategorySchema = new Schema({
    title: String,
    description: String,
    userId: String,
    order: OrderType,
});

export default model('category', CategorySchema);