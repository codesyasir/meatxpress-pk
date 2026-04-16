import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
    const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (!RESEND_API_KEY || !ADMIN_EMAIL) {
      return NextResponse.json({ success: true, note: "Email not configured" });
    }

    const { orderNum, name, phone, address, payMethod, items, subtotal, delivery, grandTotal, customerEmail, whatsapp } = body;

    const itemRows = items.map((i: any) =>
      `<tr><td style="padding:8px;border-bottom:1px solid #eee;">${i.name}${i.pieceLabel ? ` (${i.pieceLabel})` : ""}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:700;">Rs ${(i.linePrice * i.quantity).toLocaleString()}</td></tr>`
    ).join("");

    const adminHTML = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#C8102E;padding:20px;text-align:center;">
          <h1 style="color:white;margin:0;">New Order #${orderNum}</h1>
        </div>
        <div style="background:#fff;padding:24px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}</p>
          ${whatsapp ? `<p><strong>WhatsApp:</strong> ${whatsapp}</p>` : ""}
          <p><strong>Payment:</strong> ${payMethod === "cod" ? "Cash on Delivery" : "JazzCash"}</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead><tr style="background:#f5f5f5;">
              <th style="padding:8px;text-align:left;">Item</th>
              <th style="padding:8px;">Qty</th>
              <th style="padding:8px;text-align:right;">Price</th>
            </tr></thead>
            <tbody>${itemRows}</tbody>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff8f0;border-radius:8px;">
            <p style="margin:4px 0;"><strong>Subtotal:</strong> Rs ${subtotal.toLocaleString()}</p>
            <p style="margin:4px 0;"><strong>Delivery:</strong> ${delivery === 0 ? "FREE" : `Rs ${delivery}`}</p>
            <p style="margin:4px 0;font-size:18px;color:#C8102E;"><strong>Total: Rs ${grandTotal.toLocaleString()}</strong></p>
          </div>
        </div>
      </div>`;

    const customerHTML = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#C8102E;padding:20px;text-align:center;">
          <h1 style="color:white;margin:0;">Order Confirmed! #${orderNum}</h1>
        </div>
        <div style="background:#fff;padding:24px;">
          <p>Hi <strong>${name}</strong>, your order is confirmed. We will deliver within 24 hours.</p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead><tr style="background:#f5f5f5;">
              <th style="padding:8px;text-align:left;">Item</th>
              <th style="padding:8px;">Qty</th>
              <th style="padding:8px;text-align:right;">Price</th>
            </tr></thead>
            <tbody>${itemRows}</tbody>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff8f0;border-radius:8px;">
            <p style="font-size:18px;color:#C8102E;margin:0;"><strong>Total: Rs ${grandTotal.toLocaleString()}</strong></p>
          </div>
          ${payMethod === "jazzcash" ? `<div style="margin-top:16px;padding:16px;background:#fffbeb;border:1px solid #fbbf24;border-radius:8px;"><p style="margin:0;color:#92400e;"><strong>Action Required:</strong> Send Rs ${grandTotal.toLocaleString()} to JazzCash 0321-5402284 and share screenshot on WhatsApp.</p></div>` : ""}
          <p style="margin-top:16px;">Questions? WhatsApp us: <strong>0321-5402284</strong></p>
        </div>
      </div>`;

    // Send admin email using fetch directly (no SDK needed)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Order #${orderNum} — Rs ${grandTotal.toLocaleString()} — ${name}`,
        html: adminHTML,
      }),
    });

    // Send customer email if provided
    if (customerEmail) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: customerEmail,
          subject: `Order Confirmed #${orderNum} — MeatXpress.pk`,
          html: customerHTML,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order error:", error);
    return NextResponse.json({ success: true });
  }
}