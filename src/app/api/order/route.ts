import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@meatxpress.pk";
const FROM_EMAIL = process.env.FROM_EMAIL || "orders@meatxpress.pk";

interface OrderItem {
  name: string;
  pieceLabel?: string;
  quantity: number;
  linePrice: number;
}

interface OrderPayload {
  orderNum: string;
  name: string;
  phone: string;
  address: string;
  whatsapp?: string;
  payMethod: string;
  customerEmail?: string;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  grandTotal: number;
}

function adminHTML(o: OrderPayload) {
  const rows = o.items.map(i =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;font-size:14px;">${i.name}${i.pieceLabel ? ` <em style="color:#999;font-size:12px;">(${i.pieceLabel})</em>` : ""}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;text-align:center;font-size:14px;">${i.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;text-align:right;font-size:14px;font-weight:700;">≈ Rs ${(i.linePrice * i.quantity).toLocaleString()}</td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><body style="margin:0;background:#fff8f0;font-family:Arial,sans-serif;">
<div style="max-width:580px;margin:20px auto;">
  <div style="background:#C8102E;padding:24px;border-radius:14px 14px 0 0;text-align:center;">
    <h1 style="color:#fff;margin:0;font-size:22px;">🛒 New Order — MeatXpress.pk</h1>
    <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px;">Order #${o.orderNum}</p>
  </div>
  <div style="background:#fff;padding:24px;border-radius:0 0 14px 14px;">
    <h3 style="color:#C8102E;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;">Customer</h3>
    <table style="width:100%;font-size:14px;margin-bottom:20px;"><tbody>
      <tr><td style="color:#888;padding:4px 0;width:90px;">Name</td><td style="font-weight:700;padding:4px 0;">${o.name}</td></tr>
      <tr><td style="color:#888;padding:4px 0;">Phone</td><td style="font-weight:700;padding:4px 0;"><a href="tel:${o.phone}" style="color:#C8102E;">${o.phone}</a></td></tr>
      <tr><td style="color:#888;padding:4px 0;">Address</td><td style="font-weight:700;padding:4px 0;">${o.address}</td></tr>
      ${o.whatsapp ? `<tr><td style="color:#888;padding:4px 0;">WhatsApp</td><td style="font-weight:700;padding:4px 0;">${o.whatsapp}</td></tr>` : ""}
      <tr><td style="color:#888;padding:4px 0;">Payment</td><td style="font-weight:700;padding:4px 0;">${o.payMethod === "cod" ? "💵 Cash on Delivery" : "📱 JazzCash"}</td></tr>
    </tbody></table>
    <h3 style="color:#C8102E;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:.05em;">Items</h3>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <thead><tr style="background:#fff8f0;"><th style="padding:8px 12px;text-align:left;font-size:12px;color:#888;">Product</th><th style="padding:8px 12px;font-size:12px;color:#888;">Qty</th><th style="padding:8px 12px;text-align:right;font-size:12px;color:#888;">Price</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="background:#fff8f0;border-radius:10px;padding:14px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;"><span style="color:#888;">Subtotal</span><span>≈ Rs ${o.subtotal.toLocaleString()}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:8px;"><span style="color:#888;">Delivery</span><span style="color:${o.delivery === 0 ? "#16a34a" : "#000"};">${o.delivery === 0 ? "FREE" : `Rs ${o.delivery}`}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;border-top:1px solid #e5d5c5;padding-top:8px;"><span>TOTAL</span><span style="color:#C8102E;">≈ Rs ${o.grandTotal.toLocaleString()}</span></div>
    </div>
    <div style="text-align:center;">
      <a href="https://wa.me/92${o.phone.replace(/^0/, "")}?text=Hi+${encodeURIComponent(o.name)}!+Your+MeatXpress+order+%23${o.orderNum}+is+confirmed.+We%27ll+deliver+within+24+hours.+Thank+you!" 
        style="display:inline-block;background:#22c55e;color:#fff;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;font-size:14px;">
        Confirm to Customer on WhatsApp
      </a>
    </div>
  </div>
</div></body></html>`;
}

function customerHTML(o: OrderPayload) {
  const rows = o.items.map(i =>
    `<tr>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;font-size:14px;">${i.name}${i.pieceLabel ? ` (${i.pieceLabel})` : ""}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;text-align:center;font-size:14px;">×${i.quantity}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #fce8e8;text-align:right;font-size:14px;font-weight:700;">≈ Rs ${(i.linePrice * i.quantity).toLocaleString()}</td>
    </tr>`).join("");

  return `<!DOCTYPE html><html><body style="margin:0;background:#fff8f0;font-family:Arial,sans-serif;">
<div style="max-width:580px;margin:20px auto;">
  <div style="background:#C8102E;padding:28px;border-radius:14px 14px 0 0;text-align:center;">
    <div style="font-size:44px;margin-bottom:6px;">✅</div>
    <h1 style="color:#fff;margin:0;font-size:22px;">Order Confirmed!</h1>
    <p style="color:rgba(255,255,255,.8);margin:6px 0 0;font-size:13px;">Order #${o.orderNum} · MeatXpress.pk</p>
  </div>
  <div style="background:#fff;padding:24px;border-radius:0 0 14px 14px;">
    <p style="font-size:15px;color:#444;margin:0 0 20px;">Hi <strong>${o.name}</strong>! Your order is confirmed. We will deliver within <strong>24 hours</strong>.</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <thead><tr style="background:#fff8f0;"><th style="padding:8px 12px;text-align:left;font-size:12px;color:#888;">Item</th><th style="padding:8px 12px;font-size:12px;color:#888;">Qty</th><th style="padding:8px 12px;text-align:right;font-size:12px;color:#888;">Price</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div style="background:#fff8f0;border-radius:10px;padding:14px;margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;"><span>Est. Total</span><span style="color:#C8102E;">≈ Rs ${o.grandTotal.toLocaleString()}</span></div>
      <p style="margin:6px 0 0;font-size:12px;color:#999;">For piece-sold items, exact weight measured at delivery. You pay actual weight only.</p>
    </div>
    ${o.payMethod === "jazzcash" ? `<div style="background:#fffbeb;border:1px solid #fbbf24;border-radius:10px;padding:14px;margin-bottom:20px;font-size:14px;color:#92400e;"><strong>⚡ Action Required:</strong> Send Rs ${o.grandTotal.toLocaleString()} to JazzCash <strong>0321-5402284</strong> and share screenshot on WhatsApp.</div>` : ""}
    <div style="text-align:center;background:#f0fdf4;border-radius:10px;padding:16px;">
      <p style="margin:0 0 10px;font-size:13px;color:#444;">Need help? Contact us on WhatsApp</p>
      <a href="https://wa.me/923215402284" style="display:inline-block;background:#22c55e;color:#fff;font-weight:700;padding:10px 22px;border-radius:8px;text-decoration:none;font-size:14px;">0321-5402284</a>
    </div>
  </div>
  <p style="text-align:center;color:#aaa;font-size:11px;margin-top:12px;">© MeatXpress.pk · Lahore · Delivered fresh within 24 hrs</p>
</div></body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderPayload = await req.json();
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Admin email — always send
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🛒 New Order #${body.orderNum} — ≈Rs ${body.grandTotal.toLocaleString()} — ${body.name}`,
      html: adminHTML(body),
    });

    // Customer confirmation — only if email provided
    if (body.customerEmail) {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: body.customerEmail,
        subject: `✅ Order Confirmed #${body.orderNum} — MeatXpress.pk`,
        html: customerHTML(body),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json({ success: true, emailError: true });
  }
}
