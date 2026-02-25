// app/api/clerk/route.js
import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";   
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log("📨 Webhook received at /api/clerk");
    
    try {
        // Check for signing secret
        if (!process.env.SIGNING_SECRET) {
            console.error("❌ SIGNING_SECRET is not set");
            return NextResponse.json(
                { error: "Server configuration error" },
                { status: 500 }
            );
        }

        const wh = new Webhook(process.env.SIGNING_SECRET);
        const headerPayload = await headers();
        
        // Get headers
        const svixId = headerPayload.get("svix-id");
        const svixSignature = headerPayload.get("svix-signature");
        const svixTimestamp = headerPayload.get("svix-timestamp");

        // Verify all required headers exist
        if (!svixId || !svixSignature || !svixTimestamp) {
            console.log("❌ Missing Svix headers");
            return NextResponse.json(
                { error: "Missing Svix headers" },
                { status: 400 }
            );
        }

        const svixHeaders = {
            "svix-id": svixId,
            "svix-signature": svixSignature,
            "svix-timestamp": svixTimestamp
        };

        const payload = await req.json();
        console.log("📦 Payload type:", payload.type);
        
        const body = JSON.stringify(payload);
        
        // Verify the webhook
        const { data, type } = wh.verify(body, svixHeaders);
        console.log(`✅ Verified webhook: ${type} for user ${data.id}`);

        // SAFELY extract user data with optional chaining and fallbacks
        const userData = {
            _id: data.id,
            email: data.email_addresses?.[0]?.email_address || data.external_accounts?.[0]?.email_address || "",
            name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.external_accounts?.[0]?.name || 'User',
            image: data.image_url || data.profile_image_url || data.external_accounts?.[0]?.avatar_url || "",
        };

        console.log("📝 User data to save:", userData);

        // Connect to database
        try {
            await connectDB();
            console.log("✅ Database connected");
        } catch (dbError) {
            console.error("❌ Database connection failed:", dbError);
            return NextResponse.json(
                { error: "Database connection failed" },
                { status: 500 }
            );
        }

        // Handle different event types
        switch(type){
            case 'user.created':
                console.log("Creating new user...");
                await User.create(userData);
                console.log("✅ User created in database");
                break;
            case 'user.updated':
                console.log("Updating user...");
                await User.findByIdAndUpdate(data.id, userData);
                console.log("✅ User updated in database");
                break;
            case 'user.deleted':
                console.log("Deleting user...");
                await User.findByIdAndDelete(data.id);
                console.log("✅ User deleted from database");
                break;
            default:    
                console.log(`⚠️ Unhandled event type: ${type}`);
                break;
        }
        
        return NextResponse.json({ 
            message: "Event received",
            type: type,
            userId: data.id 
        }, { status: 200 });

    } catch (error) {
        console.error("❌ Webhook error:", error);
        console.error("Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        
        return NextResponse.json(
            { error: "Webhook processing failed", details: error.message },
            { status: 500 }
        );
    }
}

// Add GET handler for testing
export async function GET() {
    return NextResponse.json({ 
        message: "Clerk webhook endpoint is working. Use POST for webhooks.",
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
    return NextResponse.json({}, { 
        status: 200,
        headers: {
            'Allow': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, svix-id, svix-signature, svix-timestamp'
        }
    });
}