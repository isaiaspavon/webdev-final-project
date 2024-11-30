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

// GET an item
export async function GET(request:NextRequest, { params }: RouteParams) {
    const { id } = await params;

    let userId = id;
    if (typeof id === 'string') {
        userId = new ObjectId(id);
    }
    await connectMongoDB();
    const item = await User.findOne({ _id: userId});    
    return NextResponse.json({ item }, { status: 200});
}

// PUT an item
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
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
  
    if (!body || !Array.isArray(body.Roommate)) {
      return NextResponse.json({ success: false, message: "Roommate field must be an array" }, { status: 400 });
    }
  
    try {
      await connectMongoDB();
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $push: { roommates: body.Roommate } }, // Update the array directly
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
      }
  
      console.log("Updated user:", updatedUser);
      return NextResponse.json({ success: true, data: updatedUser, message: "Roommate added/updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
  }
  




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