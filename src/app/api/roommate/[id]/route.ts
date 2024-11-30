// Get information specific to an individual 

import connectMongoDB from "@/libs/mongodb";
import { ObjectId } from 'mongodb';
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import {User} from "@/models/UserSchema";

// user id
interface RouteParams {
    params: { id: string };
}
// GET request - Fetch User and populate roommates field
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    console.log("Received ID:", id);

    // Convert the ID to ObjectId if necessary
    let userId = id;
    if (typeof id === "string") {
        try {
            userId = new ObjectId(id);
        } catch (err) {
            console.error("Error converting ID to ObjectId:", err);
            return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
        }
    }

    await connectMongoDB();
    console.log("Connected to MongoDB");

    try {
        // Fetch user and populate roommates array with full user data
        const item = await User.findOne({ _id: userId }).populate("roommates");

        if (!item) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: item }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// PUT request - Update User's roommates array
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    const { roommates } = await request.json(); // Get the roommates data from the body
    
    if (!Array.isArray(roommates)) {
        return NextResponse.json({ success: false, message: 'Roommates must be an array' }, { status: 400 });
    }

    // Update the user by adding the roommates to the array
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $push: { roommates: { $each: roommates } } }, { new: true });
        if (!updatedUser) {
            return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
        console.error('Error updating roommates:', error);
        return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
    }
}






// DELETE an item
// DELETE request - Remove a specific roommate from the roommates array
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;

    console.log("Received ID for DELETE:", id);

    // Validate the user ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn("Invalid user ID format");
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    let body;
    try {
        body = await request.json();
        console.log("Request body for DELETE:", body);
    } catch (err) {
        console.error("Error parsing JSON in DELETE:", err);
        return NextResponse.json({ success: false, message: "Invalid JSON payload" }, { status: 400 });
    }

    // Ensure roommateId is provided
    const { roommateId } = body;
    if (!mongoose.Types.ObjectId.isValid(roommateId)) {
        console.warn("Invalid roommate ID format");
        return NextResponse.json({ success: false, message: "Invalid roommate ID format" }, { status: 400 });
    }

    try {
        await connectMongoDB();
        console.log("Connected to MongoDB for DELETE");

        // Remove the specific roommate from the roommates array
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $pull: { roommates: roommateId } }, // $pull removes specific items from an array
            { new: true }
        );

        if (!updatedUser) {
            console.warn("User not found during DELETE operation");
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        console.log("Updated user after DELETE:", updatedUser);
        return NextResponse.json({ success: true, data: updatedUser, message: "Roommate removed successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error removing roommate:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}
