import { useState, useEffect } from "react";
import { NewsMovie } from "../../data/news";
import newsimg from "../../assets/newsimg.png"
import "./NewsPage.css"

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
    <img src={newsimg} alt='movie' className='movieimg' />
    <div>
      <h1>Hi!</h1>
      <h3>
      Catch the latest movie news here!🎥
        <br />
        The latest in cinema, just for you!🍿
      </h3>
    </div>
  </div>
    <div className='card2-grid'>
      {loading ? <div> loading...</div> : null}
      {error ? <Error /> : null}
      {news.slice(82,100).map((news) => (
        <div className='card2' key={news.id}>
          <img src={news.urlToImage } alt='Card2 image' className='card-image' />
          <div className='card2-content'>
            <div className='card2-date'> </div>
            <div className='card2-author'></div>
            <h3 className='card2-title'></h3>
            <p className='card2-description'></p>
            <a href='#' className='card2-link'>
              READ MORE
            </a>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
