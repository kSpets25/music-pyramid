// pages/api/similarBands.js

export default async function handler(req, res) {
    const { userquery } = req.query;
  
    if (!userquery) {
      return res.status(400).json({ results: [], error: "Missing query" });
    }
  
    const apiKey = process.env.TASTEDIVE_API_KEY || "";
    const apiUrl = `https://tastedive.com/api/similar?q=${encodeURIComponent(
      userquery
    )}&type=music&info=1&limit=10&k=${apiKey}`;
  
    try {
      // 🔍 1. TasteDive fetch
      const tdRes = await fetch(apiUrl);
      const tdData = await tdRes.json();
      let results = tdData?.similar?.results || [];
  
      // 📘 2. Wikipedia image enhancement
      results = await Promise.all(
        results.map(async (item) => {
          if (!item.wUrl) {
            item.wImg = null;
            return item;
          }
  
          try {
            const pageTitle = decodeURIComponent(item.wUrl.split("/").pop());
            const wikiRes = await fetch(
              `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`
            );
            const wikiData = await wikiRes.json();
  
            item.wImg = wikiData?.thumbnail?.source || null;
          } catch (e) {
            item.wImg = null;
          }
  
          return item;
        })
      );
  
      return res.status(200).json({ results });
    } catch (error) {
      return res.status(500).json({
        error: "API fetch failed",
        results: [],
      });
    }
  }
  