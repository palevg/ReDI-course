import { useEffect, useState } from "react";
import "../styles/quotes.css";

const Quotes = () => {
  const [quote, setQuote] = useState("");

  const getGuote = async () => {
    try {
      const res = await fetch("https://dummyjson.com/quotes/random");
      const data = await res.json();
      return setQuote(data);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getGuote();
  }, []);

  return (
    <div className="quote-app">
      <div className="quote-field">
        <div className="quote-header">Quote of the Day</div>
        <div className="quote-text">
          <span>&ldquo;</span> {quote.quote} <span>&rdquo;</span>
        </div>
        <div className="quote-author">&mdash; {quote.author}</div>
        <div className="quote-buttons">
          <div className="social-btns">
            <a
              className="social-btn"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-facebook"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </a>
            <a
              className="social-btn"
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
            >
              &#120143;
            </a>
          </div>
          <button className="quote-next" onClick={getGuote}>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quotes;