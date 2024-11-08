import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/itemSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    const items = await Item.find();
    return NextResponse.json({ items }, { status: 200 });
}

export async function POST(request: NextRequest) {
    const {title, description, image} = await request.json();
    await connectMongoDB();
    await Item.create({ title, description, image });
    return NextResponse.json({ message: "Item added successfully"}), { status: 201 };
}

export async function PUT(request:NextRequest, { params }: RouteParams ) {
    const { id } = params;
    const { title: title, description: description, image: image } = await request.json();
    await connectMongoDB();
    await Item.findByIdAndUpdate(id, { title, description, image });
    return NextResponse.json({ message: "Item updated"}), { status: 200};
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format"}, { status: 400 });
    }

    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found"}, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted"}, { status: 200 });
}