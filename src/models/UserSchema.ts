import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    firstname: String;
    lastname: String;
    email: String;
    password: String;
    major: String;
    pets: Boolean;
    mindpets: Boolean;
    tidiness: String;
    degreelvl: String;
    gender: String;
    genderpref: String;
}

const userSchema = new Schema<IUser>({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    major: {type: String, required: true},
    pets: {type: Boolean, required: true},
    mindpets: {type: Boolean, required: true},
    tidiness: {type: String, required: true},
    degreelvl: {type: String, required: true},
    gender: {type: String, required: true},
    genderpref: {type: String, required: true},

})

export const User = mongoose.models.User?? mongoose.model("User", userSchema);