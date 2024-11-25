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
export async function PUT(request:NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { title: title, description: description, image: image } = await request.json();
    await connectMongoDB();
    await Item.findByIdAndUpdate(id, { title, description, image});
    return NextResponse.json({ message: "Item updated" }, { status: 200});
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