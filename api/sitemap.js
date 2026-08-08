export default async function handler(req, res) {
    try {
        const backendUrl = "https://eightyeight-backend.onrender.com";
        const response = await fetch(backendUrl + "/api/product/list");
        const data = await response.json();
        const products = data.products || [];

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

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

        staticPages.forEach((page) => {
            xml += `  <url>\n    <loc>${page.loc}</loc>\n    <priority>${page.priority}</priority>\n  </url>\n`;
        });

        products.forEach((product) => {
            const productUrl = `https://www.8ighty8ight.xyz/Product/${product._id}`;
            xml += `  <url>\n    <loc>${productUrl}</loc>\n    <priority>0.7</priority>\n`;
            (product.images || []).forEach((imgUrl) => {
                xml += `    <image:image>\n      <image:loc>${imgUrl}</image:loc>\n      <image:title>${escapeXml(product.name)}</image:title>\n    </image:image>\n`;
            });
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;

        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(xml);
    } catch (error) {
        console.error("Sitemap generation error:", error);
        res.status(500).send("Error generating sitemap");
    }
}