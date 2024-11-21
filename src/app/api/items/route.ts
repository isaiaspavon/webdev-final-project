import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

// GET: Fetch all profiles
export async function GET() {
    await connectMongoDB();
    try {
        const users = await User.find();
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching profiles:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "Error fetching profiles" }, { status: 500 });
    }
}

// POST: Add a new profile
export async function POST(request: NextRequest) {
    const {
        fName,
        lName,
        email,
        password,
        major,
        cleanliness,
        degreeLevel,
        gender,
        roommatePreference,
        briefDescription,
        hasPets,
        mindsPets,
        petType,
    } = await request.json();

    await connectMongoDB();

    try {
        const newUser = await User.create({
            fName, 
            lName,
            email,
            password,
            major,
            cleanliness,
            degreeLevel,
            gender,
            roommatePreference,
            briefDescription,
            hasPets,
            mindsPets,
            petType: hasPets ? petType : null, // Only include petType if the user has pets
        });

        return NextResponse.json({ success: true, data: newUser, message: "Profile added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding profile:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "Error adding profile" }, { status: 500 });
    }
}

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