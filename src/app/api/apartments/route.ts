import connectMongoDB from "@/libs/mongodb";
import Apartment from "@/models/ApartmentSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

interface RouteParams {
    params: { id: string };
}

// GET: Fetch all apartments
export async function GET() {
    await connectMongoDB();
    try {
        const apartments = await Apartment.find();
        return NextResponse.json({ success: true, data: apartments }, { status: 200 });
    } catch (error) {
        console.error("Error fetching apartments:", error);
        return NextResponse.json({ success: false, message: "Error fetching apartments" }, { status: 500 });
    }
}

// POST: Add a new apartment
export async function POST(request: NextRequest) {
    const { title, address, description, imageUrl } = await request.json();

    await connectMongoDB();

    try {
        const newApartment = await Apartment.create({
            title,
            address,
            description,
            imageUrl,
        });

        return NextResponse.json({ success: true, data: newApartment, message: "Apartment added successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error adding apartment:", error);
        return NextResponse.json({ success: false, message: "Error adding apartment" }, { status: 500 });
    }
}

// PUT: Update an existing apartment
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    const { title, address, description, imageUrl } = await request.json();

    await connectMongoDB();

    try {
        const updatedApartment = await Apartment.findByIdAndUpdate(
            id,
            { title, address, description, imageUrl },
            { new: true }
        );

        if (!updatedApartment) {
            return NextResponse.json({ message: "Apartment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedApartment, message: "Apartment updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating apartment:", error);
        return NextResponse.json({ success: false, message: "Error updating apartment" }, { status: 500 });
    }
}

// DELETE: Delete an existing apartment
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        const deletedApartment = await Apartment.findByIdAndDelete(id);

        if (!deletedApartment) {
            return NextResponse.json({ message: "Apartment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Apartment deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting apartment:", error);
        return NextResponse.json({ success: false, message: "Error deleting apartment" }, { status: 500 });
    }
}