// Get information specific to an individual 

import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { User } from "@/models/UserSchema";

// user id
interface RouteParams {
    params: { id: string };
}

// GET an item
export async function GET(request:NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const item = await Item.findOne({ _id: id});
    return NextResponse.json({ item }, { status: 200});
}

// // PUT an item
// export async function PUT(request:NextRequest, { params }: RouteParams) {
//     const { id } = params;
//     const { title: title, description: description, image: image } = await request.json();
//     await connectMongoDB();
//     await Item.findByIdAndUpdate(id, { title, description, image});
//     return NextResponse.json({ message: "Item updated" }, { status: 200});
// }


// // DELETE an item
// export async function DELETE(request:NextRequest, { params }: RouteParams) {
//     const { id } = params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return NextResponse.json({ message: "Invalid ID format"}, { status: 400});
//     }

//     await connectMongoDB();
//     const deletedItem = await Item.findByIdAndDelete(id);

//     if (!deletedItem) {
//         return NextResponse.json({ message: "Item not found"}, { status: 404});
//     }

//     return NextResponse.json({ message: "Item deleted"}, { status: 200});
// }


// PUT: Update an existing profile
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const {
        major,
        cleanliness,
        degreeLevel,
        gender,
        roommatePreference,
        briefDescription,
        hasPets,
        mindsPets,
        petType,
        imageURL
    } = await request.json(); // Expecting fields in the user schema

    await connectMongoDB();

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {

            major,
            cleanliness,
            degreeLevel,
            gender,
            roommatePreference,
            briefDescription,
            hasPets,
            mindsPets,
            petType: hasPets ? petType : null, // Only update petType if user has pets
            imageURL
        }, { new: true }); // The `new: true` option returns the updated document

        if (!updatedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedUser, message: "Profile updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "Error updating profile" }, { status: 500 });
    }
}

// DELETE: Delete an existing profile
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Profile deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting profile:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "Error deleting profile" }, { status: 500 });
    }
}