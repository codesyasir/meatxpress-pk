// WordPress / WooCommerce headless integration
// Once you set up cms.meatxpress.pk, use these functions

const WP_URL = process.env.NEXT_PUBLIC_WP_API_URL || "";
const CK = process.env.WC_CONSUMER_KEY || "";
const CS = process.env.WC_CONSUMER_SECRET || "";

function authHeader() {
  const encoded = Buffer.from(`${CK}:${CS}`).toString("base64");
  return { Authorization: `Basic ${encoded}`, "Content-Type": "application/json" };
}

export async function getWCProducts() {
  if (!WP_URL) return null;
  try {
    const res = await fetch(`${WP_URL}/products?per_page=100&status=publish`, {
      headers: authHeader(), next: { revalidate: 60 }
    });
    return await res.json();
  } catch { return null; }
}

export async function getWCCategories() {
  if (!WP_URL) return null;
  try {
    const res = await fetch(`${WP_URL}/products/categories`, {
      headers: authHeader(), next: { revalidate: 300 }
    });
    return await res.json();
  } catch { return null; }
}

export async function createWCOrder(orderData: object) {
  if (!WP_URL) return null;
  try {
    const res = await fetch(`${WP_URL}/orders`, {
      method: "POST", headers: authHeader(),
      body: JSON.stringify(orderData)
    });
    return await res.json();
  } catch { return null; }
}
