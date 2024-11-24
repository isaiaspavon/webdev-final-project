import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    fName: string;
    lName: string;
    email: string;
    password: string;
    major: string;
    cleanliness: string;
    degreeLevel: string;
    gender: string;
    roommatePreference: string;
    briefDescription: string;
    hasPets: string;
    mindsPets: string;
    petType?: string; // Optional if user doesn't have pets
    imageURL : string;
}

const userSchema = new mongoose.Schema<IUser>({
    fName: { type: String, required: true},
    lName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    major: { type: String, required: false },
    cleanliness: { type: String, required: false },
    degreeLevel: { type: String, required: false },
    gender: { type: String, required: false },
    roommatePreference: { type: String, required: false },
    briefDescription: { type: String, required: false },
    hasPets: { type: String, required: false },
    mindsPets: { type: String, required: false },
    petType: { type: String, required: false },
    imageURL: {type: String, required: false }

})

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);
