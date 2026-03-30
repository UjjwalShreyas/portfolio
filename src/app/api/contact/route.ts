import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHTML(str: string) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// In-memory rate limiting map
// Keys are IP addresses, values are { count, timestamp }
const rateLimitMap = new Map();

export async function POST(req: Request) {
  try {
    // 1. Strict CORS verify
    const origin = req.headers.get("origin");
    if (origin && !origin.includes("ujjwalshreyas") && !origin.includes("localhost") && !origin.includes("vercel.app")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. IP Rate Limiting Setup
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const now = Date.now();
    const rateLimitCtx = rateLimitMap.get(ip);
    
    if (rateLimitCtx) {
      if (now - rateLimitCtx.timestamp < 60000) { // 1 min window
        if (rateLimitCtx.count >= 5) {
          return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
        rateLimitMap.set(ip, { count: rateLimitCtx.count + 1, timestamp: rateLimitCtx.timestamp });
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now }); // reset window
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const { name, email, message } = body;

    // 3. Validation & Content check
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Sanitization to prevent XSS (if logs or DB are ever viewed unsafely)
    const sanitizedName = escapeHTML(name.substring(0, 100));
    const sanitizedEmail = escapeHTML(email.substring(0, 100));
    const sanitizedMessage = escapeHTML(message.substring(0, 2000));

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>', // Use verified domain if available
        to: ['ujvivobook@gmail.com'], 
        subject: `New Portfolio Message from ${sanitizedName}`,
        replyTo: sanitizedEmail,
        text: `You have a new secure message from your portfolio website.\n\nFrom: ${sanitizedName} (${sanitizedEmail})\n\nMessage:\n${sanitizedMessage}`,
      });

      if (error) {
        console.error("Resend API Error details:", error);
        // Do not leak Resend error details to the client
        return NextResponse.json({ error: "Failed to deliver the message safely. Please try again later." }, { status: 500 });
      }
    } catch (deliveryError) {
      console.error("Internal delivery exception:", deliveryError);
      return NextResponse.json({ error: "Failed to deliver the message safely. Please try again later." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Valid payload received securely." });
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
