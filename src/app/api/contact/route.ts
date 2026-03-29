import { NextResponse } from "next/server";

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

    // FUTURE: Send email using Resend / EmailJS
    console.log(`SECURE CONTACT FORM SUBMISSION:
      From: ${sanitizedName} <${sanitizedEmail}>
      Message: ${sanitizedMessage}
    `);

    return NextResponse.json({ success: true, message: "Valid payload received securely." });
  } catch (error) {
    console.error("Contact Form API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
