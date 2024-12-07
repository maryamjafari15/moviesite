const API_KEY = "a705084626fdba20ce106e052663d16c";
const BASE_URL = 'https://gnews.io/api/v4/top-headlines?category=';
const category = 'entertainment';

export async function NewsMovie() {
  try {
   
    const response = await fetch(
      `${BASE_URL}${category}&lang=en&country=us&max=30&apikey=${API_KEY}`
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



