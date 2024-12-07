const API_KEY = "dfd092195e554d319b1f38c5dc3f4bf9";
const BASE_URL = 'https://newsapi.org/v2/everything';

export async function NewsMovie() {
  try {
    const query = '"movie" OR "cinema" OR "film" OR "Hollywood" OR "TV series"';
    const response = await fetch(
      `${BASE_URL}?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const articles = data.articles;
    // console.log (data.articles);
    return articles; 

  } catch (error) {
    console.error('Error fetching news:', error);
    return[]; 
  }

  
}



