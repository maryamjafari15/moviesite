import { useState, useEffect } from "react";
import { NewsMovie } from "../../data/Gnews.js";
import newsimg from "../../assets/newsimg.png";
import "./NewsPage.css";
import { Error } from "../ErrorComponent/ErrorComponent";
import defaultImage from "../../assets/default-image.png";

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setHasError] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setHasError(false);

      try {
        const articles = await NewsMovie();
        setNews(articles);
      } catch (error) {
        console.error("Failed to load news:", error);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
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
          {news.slice(0, 9).map((article, index) => (
            <div className='card3' key={article.article_id || index}>
              <img
                src={article.image_url || defaultImage}
                alt={article.title || "News"}
                className='card3-image'
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
              />

              <div className='card3-content'>
                <div className='card3-date'>
                  {article.pubDate
                    ? new Date(article.pubDate).toLocaleDateString()
                    : "Unknown date"}
                </div>

                <div className='card3-author'>
                  {article.source_name || "Unknown Source"}
                </div>

                <h3 className='card3-title'>{article.title || "No title"}</h3>

                <a
                  href={article.link || "#"}
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

        {loading && <div className='discoverLoading2'>loading...</div>}

        {error && <Error />}

        {!loading && !error && news.length === 0 && (
          <p>No news available right now.</p>
        )}
      </div>
    </>
  );
}
