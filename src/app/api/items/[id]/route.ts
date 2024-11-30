import connectMongoDB from "@/libs/mongodb";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
   params: { id: string };
}

// GET an item by id
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = await params; // Await the params object
 
    // Validate ObjectId before querying the database
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }
 
    await connectMongoDB();
    const item = await User.findOne({ _id: id });
 
    if (!item) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
 
    return NextResponse.json({ item }, { status: 200 });
 }
 

// PUT (update) an item by id
// PUT (update) an item by id
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    try {
        const updateData = await request.json(); // Fetch the update data
        await connectMongoDB();

        const updatedItem = await User.findByIdAndUpdate(
            id,
            updateData, // Pass the updateData directly
            { new: true } // Return the updated document
        );

        if (!updatedItem) {
            return NextResponse.json({ message: "Item not found or update failed" }, { status: 404 });
        }

        return NextResponse.json({ message: "Item updated successfully", updatedItem }, { status: 200 });
    } catch (error) {
        console.error("Error updating item:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
// DELETE an item by id
export async function DELETE(request: NextRequest, context: RouteParams) {
   const { id } = await context.params; // Make sure to await the params object

   // Validate ObjectId format before attempting deletion
   if (!mongoose.Types.ObjectId.isValid(id)) {
       return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
   }

   await connectMongoDB();
   const deletedItem = await User.findByIdAndDelete(id);

   if (!deletedItem) {
       return NextResponse.json({ message: "Item not found" }, { status: 404 });
   }

   return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
}

