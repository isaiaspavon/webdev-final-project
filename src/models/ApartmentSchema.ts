import mongoose, { Document, Schema } from "mongoose";

export interface IApartment extends Document {
    title: string; // Name of the apartment
    address: string; // Full address of the apartment
    description: string; // Description of the apartment
    imageUrl: string; // URL to the apartment's image
}

const apartmentSchema = new Schema<IApartment>({
    title: { type: String, required: true }, // Apartment name or title is required
    address: { type: String, required: true }, // Address is required
    description: { type: String, required: false }, // Description is optional
    imageUrl: { type: String, required: false }, // Image URL is optional
});

const Apartment = mongoose.models.Apartment || mongoose.model("Apartment", apartmentSchema);
export default Apartment;