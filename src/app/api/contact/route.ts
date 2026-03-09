import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const { name, email, phone, projectType, message } = body;

  // Server-side validation
  if (!name?.trim() || !email?.trim() || !projectType?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }
  if (name.length > 100 || message.length > 2000) {
    return NextResponse.json({ error: "Input too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL;
  if (!apiKey || !recipient) {
    console.error("Missing RESEND_API_KEY or CONTACT_RECIPIENT_EMAIL");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Adrishyam Media <${process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev"}>`,
    to: recipient,
    replyTo: email,
    subject: `New enquiry: ${projectType} — ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "—"}\nProject: ${projectType}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
