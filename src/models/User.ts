import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface User {
    email: string;
    password: string;
    fullName?: string;
    alias?: string;
    role: 'admin' | 'editor' | 'guest';
}

export interface UserModel extends User, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAuthToken(): string;
}

const userSchema = new Schema<UserModel>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: String,
    alias: String,
    role: { type: String, enum: ['admin', 'editor', 'guest'], default: 'guest' }
});

userSchema.pre<UserModel>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY || 'your_default_secret');
    return token;
};

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
