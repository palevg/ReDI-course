import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>My Homeworks of&nbsp;React&nbsp;class in&nbsp;<a href="https://www.redi-school.org/" target="_blank" rel="noopener noreferrer">ReDI&nbsp;School</a> (IX-X.2023)</h1>
      <div className="home__items">
        <Link className="home__item" to="/animals">Lesson 4 - Page with Animals (Selectors Choice)</Link>
        <Link className="home__item" to="/portfolio">Lesson 6 - "Portfolio project"</Link>
        <Link className="home__item" to="/todo">Lesson 8 - Mini Apps: "Todo App"</Link>
        <Link className="home__item" to="/calculator">Lesson 8 - Mini Apps: "Basic Calculator"</Link>
        <Link className="home__item" to="/quotes">Lesson 8 - Mini Apps: "Random Quote Generator"</Link>
        <Link className="home__item" to="/tic-tac-toe">Lesson 8 - Mini Apps: "Tic-Tac-Toe Game"</Link>
        <Link className="home__item" to="/products">Lesson 10 - Thema: "Thinking in React"</Link>
      </div>
    </div>
  )
}

export default Home;