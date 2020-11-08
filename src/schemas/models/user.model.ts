import {Document, model, Schema } from "mongoose";
import bcrypt from "bcrypt"


export interface IUser extends Document{
    comparePasswords(passwordInput: string, passwordDB: string): boolean;
    name: string,
    lastname: string
    email: string
    password: string
    birthday: string
    role: string
    registerDate: string
    updatedAt: string
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['CLIENT', 'ADMIN'],
        default: 'CLIENT'
    },
}, {
    timestamps: {
        createdAt: 'registerDate',
        updatedAt: 'updatedAt'
    },
    versionKey: false
});

UserSchema.method('comparePasswords', async (passwordInput: string, passwordDB: string)=>{

    return await bcrypt.compare(passwordInput, passwordDB)
    
})

const User = model<IUser>('User', UserSchema)

export default User