const API_URL = "/api/news";

export async function NewsMovie() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`News API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || "Failed to fetch news");
  }

  return data.results || [];
}
