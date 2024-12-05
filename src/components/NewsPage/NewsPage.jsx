import { useState, useEffect } from "react";
import { NewsMovie } from "../../data/news";
import newsimg from "../../assets/newsimg.png";
import "./NewsPage.css";
import { Error } from "../ErrorComponent/ErrorComponent";
import defaultImage from "../../assets/default-image.png";

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    async function getdata() {
      setloading(true);
      setHasError(false);
      try {
        const news = await NewsMovie();
        setNews(news);
      } catch {
        setHasError(true);
      } finally {
        setloading(false);
      }
    }
    getdata();
  }, []);

  return (
    <>
      <div className='head-search2'>
        <img src={newsimg} alt='movie' className='movieimg2' />
        <div>
          <h1>Hi!</h1>
          <h3>
            Catch the latest movie news here!🎥
            <br />
            The latest in cinema, just for you!🍿
          </h3>
        </div>
      </div>
      <div className='section2-newspage'>
        <h1 className='newsh1'>News</h1>
        <hr />
        <div className='card3-grid'>
         
          {news
            .filter(
              (item) => item.urlToImage && !item.urlToImage.endsWith(".webp")
            )
            .slice(0, 30)
            .map((news) => (
              <div className='card3' key={news.id}>
                <img
                  src={
                    news.urlToImage
                      ? news.urlToImage
                      : "https://via.placeholder.com/300"
                  }
                  alt='news'
                  className='card3-image'
                  onError={(e) => { e.target.src = defaultImage; }}
                />
                <div className='card3-content'>
                  <div className='card3-date'>
                    {news.publishedAt
                      ? new Date(news.publishedAt).toLocaleDateString()
                      : "Unknown date"}{" "}
                  </div>
                  <div className='card3-author'>
                    {news.author || "Unknown Author"}
                  </div>
                  <h3 className='card3-title'>{news.title || "No title"}</h3>

                  <a
                    href={news.url || "#"}
                    className='card3-link'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    READ MORE...
                  </a>
                </div>
              </div>
            ))}
            
        </div>
        {loading ? <div className="discoverLoading2"> loading...</div> : null}
          {error ? <Error /> : null}
      </div>
    </>
  );
}
