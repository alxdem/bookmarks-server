import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    id: String,
    name: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
});

export default model('user', UserSchema);