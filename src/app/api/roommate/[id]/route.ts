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
    console.log("Received ID for PUT:", id);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.warn("Invalid ID format");
        return NextResponse.json({ success: false, message: "Invalid ID format" }, { status: 400 });
    }

    let body;
    try {
        body = await request.json();
        console.log("Request body:", body);
    } catch (err) {
        console.error("Error parsing JSON:", err);
        return NextResponse.json({ success: false, message: "Invalid JSON payload" }, { status: 400 });
    }

    // Ensure that the roommates field is an array
    if (!body || !Array.isArray(body.Roommate)) {
        console.warn("Invalid or missing Roommate field in request body");
        return NextResponse.json({ success: false, message: "Roommate field must be an array" }, { status: 400 });
    }

    try {
        await connectMongoDB();
        console.log("Connected to MongoDB");

        // Update the user by adding the roommates to the array
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $push: { roommates: { $each: body.Roommate } } }, // Add multiple roommates if necessary
            { new: true }
        );

        console.log("Updated user after PUT:", updatedUser);

        if (!updatedUser) {
            console.warn("User not found during PUT operation");
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedUser, message: "Roommate added/updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }}





// DELETE an item
export async function DELETE(request:NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format"}, { status: 400});
    }

    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found"}, { status: 404});
    }

    return NextResponse.json({ message: "Item deleted"}, { status: 200});
}