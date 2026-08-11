import { get } from "@vercel/blob";

const staticPages = [
    { loc: "https://www.8ighty8ight.xyz/", priority: "1.0" },
    { loc: "https://www.8ighty8ight.xyz/All-Products", priority: "0.9" },
    { loc: "https://www.8ighty8ight.xyz/Shirts", priority: "0.8" },
    { loc: "https://www.8ighty8ight.xyz/Trousers", priority: "0.8" },
    { loc: "https://www.8ighty8ight.xyz/Shoes", priority: "0.8" },
    { loc: "https://www.8ighty8ight.xyz/Accessories", priority: "0.8" },
    { loc: "https://www.8ighty8ight.xyz/Resource/Policy", priority: "0.3" },
    { loc: "https://www.8ighty8ight.xyz/Resource/FAQ", priority: "0.3" },
    { loc: "https://www.8ighty8ight.xyz/Support/AboutUs", priority: "0.3" },
];

const escapeXml = (str) =>
    String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export default async function handler(req, res) {
    let products = [];

    try {
        // get() authenticates automatically via OIDC/BLOB_READ_WRITE_TOKEN
        // once the store is connected to this project — no URL needed.
        const result = await get("sitemap-products.json", { access: "private" });
        if (result && result.statusCode === 200) {
            const text = await new Response(result.stream).text();
            products = JSON.parse(text);
        }
    } catch (error) {
        console.error("Sitemap: Blob read failed, serving static pages only:", error.message);
    }

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    staticPages.forEach((page) => {
        xml += `  <url>\n    <loc>${escapeXml(page.loc)}</loc>\n    <priority>${page.priority}</priority>\n  </url>\n`;
    });

    products.forEach((product) => {
        const productUrl = escapeXml(`https://www.8ighty8ight.xyz/Product/${product._id}`);
        xml += `  <url>\n    <loc>${productUrl}</loc>\n    <priority>0.7</priority>\n`;
        (product.images || []).forEach((imgUrl) => {
            xml += `    <image:image>\n      <image:loc>${escapeXml(imgUrl)}</image:loc>\n      <image:title>${escapeXml(product.name)}</image:title>\n    </image:image>\n`;
        });
        xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(xml);
}