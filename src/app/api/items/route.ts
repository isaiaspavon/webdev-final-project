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