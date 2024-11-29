import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

interface RouteParams {
    params: { id: string };
}

// GET: Fetch all profiles
export async function GET() {
    await connectMongoDB();
    try {
        const users = await User.find();
        return NextResponse.json({ success: true, items: users }, { status: 200 }); // Change 'data' to 'items'
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
        imageURL,
        roommates
    } = await request.json();

    

    await connectMongoDB();

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fName, 
            lName,
            email,
            password: hashedPassword,
            major,
            cleanliness,
            degreeLevel,
            gender,
            roommatePreference,
            briefDescription,
            hasPets,
            mindsPets,
            petType: hasPets ? petType : null, // Only include petType if the user has pets
            imageURL,
            roommates: roommates || [],
        });

        return NextResponse.json({ success: true, data: newUser, message: "Profile added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding profile:", error); // Log the error for debugging
        return NextResponse.json({ success: false, message: "Error adding profile" }, { status: 500 });
    }
}