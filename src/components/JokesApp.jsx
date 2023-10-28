import { useEffect, useState } from "react";
import "../styles/jokes.css";

const NUMBER_OF_JOKES = 4;

function Joke(props) {
  const showAnswer = props.showLibrary ? true : props.joke.showAnswer;
  const isJokeInLibrary = props.myJokesLibrary.filter(joke => joke.id === props.joke.id).length > 0;

  function handleBookmarkClick() {
    isJokeInLibrary
      ? props.setMyJokesLibrary(props.myJokesLibrary.filter(joke => joke.id !== props.joke.id))
      : props.setMyJokesLibrary([...props.myJokesLibrary, props.joke])
  }

  function changeShowAnswerState() {
    const jokesList = [...props.jokesList];
    jokesList.forEach(joke => {
      if (joke.id === props.joke.id) joke.showAnswer = true;
      return joke;
    })
    props.setJokesList(jokesList);
  }

  return (<div className="joke">
    <div className="joke__type">{props.joke.type.charAt(0).toUpperCase() + props.joke.type.slice(1)}</div>
    <div className="joke__info">
      <div>
        <div className="joke__question">{props.joke.setup}</div>
        {showAnswer
          ? <div className="joke__answer">{props.joke.punchline}</div>
          : <div className="joke__button" onClick={changeShowAnswerState}>
            <span>Show</span>
            <img src="ma2_eye.svg" alt="bookmark" />
          </div>}
      </div>
      <div>
        <img
          className="joke__bookmark"
          onClick={handleBookmarkClick}
          src={isJokeInLibrary
            ? "ma2_bookmark_filled.svg"
            : "ma2_bookmark.svg"}
          alt="bookmark" />
      </div>
    </div>
  </div>)
}

export default function JokesApp() {
  const [jokesList, setJokesList] = useState([]);
  const [myJokesLibrary, setMyJokesLibrary] = useState([]);
  const [showLibrary, setShowLibrary] = useState(false);

  const getJokes = async () => {
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_ten");
      const data = await res.json();
      if (data.length > 4) data.length = NUMBER_OF_JOKES;
      data.map(joke => joke.showAnswer = false);
      return setJokesList(data);
    } catch (err) {
      return console.log(err);
    }
  };

  function handleNavClick(e, isShowLibrary) {
    if (!e.target.classList.value.includes('section--selected')) {
      const element = document.querySelector('.section--selected');
      if (element !== null) element.classList.remove('section--selected');
      e.target.classList.add('section--selected');
      setShowLibrary(isShowLibrary);
    }
  }

  useEffect(() => {
    getJokes();
  }, []);

  return (<div className="jokes-app">
    <div className="jokes-nav">
      <div className="jokes-nav__section section--selected" onClick={e => handleNavClick(e, false)}>New Jokes</div>
      <div className="jokes-nav__section" onClick={e => handleNavClick(e, true)}>Library</div>
    </div>
    {showLibrary
      ? myJokesLibrary.length > 0
        ? myJokesLibrary.map(joke =>
          <Joke
            key={joke.id}
            joke={joke}
            showLibrary={showLibrary}
            myJokesLibrary={myJokesLibrary}
            setMyJokesLibrary={setMyJokesLibrary}
          />)
        : <div className="jokes-library--empty">Your Jokes Library is empty!</div>
      : <>
        {jokesList.map(joke =>
          <Joke
            key={joke.id}
            joke={joke}
            jokesList={jokesList}
            setJokesList={setJokesList}
            showLibrary={showLibrary}
            myJokesLibrary={myJokesLibrary}
            setMyJokesLibrary={setMyJokesLibrary}
          />)}
        <div className="jokes-refresh" onClick={getJokes}>
          <img src="ma2_refresh.svg" alt="refresh" />
        </div>
      </>}
  </div>)
}