import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    id: String,
    name: String,
    password: String,
});

export default model('UserModel', UserSchema);