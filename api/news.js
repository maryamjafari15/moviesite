
export default async function handler(req, res) {
    if (req.method !== "GET") {
      return res.status(405).json({
        message: "Method not allowed",
      });
    }
  
    const apiKey = process.env.NEWSDATA_API_KEY;
  
    if (!apiKey) {
      return res.status(500).json({
        message: "NewsData API key is missing",
      });
    }
  
    try {
      const url = new URL("https://newsdata.io/api/1/latest");
  
      url.searchParams.set("apikey", apiKey);
      url.searchParams.set("language", "en");
      url.searchParams.set("size", "10");
  
      const response = await fetch(url);
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
  
      return res.status(200).json(data);
  
    } catch (error) {
      console.error("News API error:", error);
  
      return res.status(500).json({
        message: "Failed to fetch news",
      });
    }
  }
  