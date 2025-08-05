import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = model('User', userSchema);
export default User;