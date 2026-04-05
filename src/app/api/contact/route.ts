import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { z } from "zod";

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

// Zod schema for strictly validating input payload
const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name length exceeds 100 characters"),
  email: z.string().email("Invalid email format").max(100, "Email length exceeds 100 characters"),
  message: z.string().min(1, "Message is required").max(2000, "Message length exceeds 2000 characters")
});

export async function POST(req: Request) {
  try {
    // 1. Strict CORS verify
    const origin = req.headers.get("origin");
    if (origin && !origin.includes("ujjwalshreyas") && !origin.includes("localhost") && !origin.includes("vercel.app")) {
      console.warn(`[SECURITY] Blocked request from unauthorized origin: ${origin}`);
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 2. IP Rate Limiting Setup
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("remote-addr") || "127.0.0.1";
    const now = Date.now();
    const rateLimitCtx = rateLimitMap.get(ip);
    
    if (rateLimitCtx) {
      if (now - rateLimitCtx.timestamp < 60000) { // 1 min window
        if (rateLimitCtx.count >= 5) {
          console.warn(`[SECURITY] Abuse prevented: Rate limit exceeded for IP ${ip}`);
          return NextResponse.json({ error: "Too many requests" }, { 
            status: 429,
            headers: {
              'Retry-After': '60',
              'X-RateLimit-Limit': '5',
              'X-RateLimit-Remaining': '0',
            }
          });
        }
        rateLimitMap.set(ip, { count: rateLimitCtx.count + 1, timestamp: rateLimitCtx.timestamp });
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now }); // reset window
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json().catch(() => ({}));

    // 3. Strict Input Validation with Zod
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map((err: any) => err.message).join(', ');
      console.warn(`[SECURITY] Invalid payload received from IP ${ip}: ${errorMessages}`);
      return NextResponse.json({ error: "Invalid input parameters: " + errorMessages }, { status: 400 });
    }

    const { name, email, message } = validationResult.data;

    // Sanitization to prevent XSS (if logs or DB are ever viewed unsafely)
    const sanitizedName = escapeHTML(name);
    const sanitizedEmail = escapeHTML(email);
    const sanitizedMessage = escapeHTML(message);

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

    // Success response with clear rate limit headers remaining
    const remaining = 5 - (rateLimitMap.get(ip)?.count || 1);
    return NextResponse.json({ success: true, message: "Valid payload received securely." }, {
      status: 200,
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': remaining.toString()
      }
    });
  } catch (error) {
    console.warn(`[SECURITY] Uncaught API Error from IP ${req.headers.get("x-forwarded-for") || "unknown"}:`, error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
