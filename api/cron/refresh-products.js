import { put } from "@vercel/blob";

export default async function handler(req, res) {
    // Optional but recommended: protect this route so randoms can't trigger it
    const authHeader = req.headers["authorization"];
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const backendUrl = "https://eightyeight-backend.onrender.com";
        const response = await fetch(backendUrl + "/api/product/list");
        const data = await response.json();
        const products = data.products || [];

        // Overwrite the same file each time so the sitemap always reads the latest one.
        // access: "private" matches your store type — the file is only readable
        // via the authenticated get() call in sitemap.js, not by public URL.
        await put("sitemap-products.json", JSON.stringify(products), {
            access: "private",
            addRandomSuffix: false,
            allowOverwrite: true,
            contentType: "application/json",
        });

        res.status(200).json({ ok: true, count: products.length });
    } catch (error) {
        console.error("Cron refresh failed:", error.message);
        // Don't overwrite the existing cache on failure — just report it
        res.status(500).json({ ok: false, error: error.message });
    }
}