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
    hasPets: boolean;
    mindsPets: boolean;
    petType?: string; // Optional if user doesn't have pets
}

const userSchema = new Schema<IUser>({
    fName: { type: String, required: false },
    lName: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    major: { type: String, required: false },
    cleanliness: { type: String, required: false },
    degreeLevel: { type: String, required: false },
    gender: { type: String, required: false },
    roommatePreference: { type: String, required: false },
    briefDescription: { type: String, required: false },
    hasPets: { type: Boolean, required: false },
    mindsPets: { type: Boolean, required: false },
    petType: { type: String, required: false },

})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;