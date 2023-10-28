import { Link } from 'react-router-dom';

const links = [
  { page: "/animals", text: "Lesson 4 - Page with Animals (Selectors Choice)" },
  { page: "/portfolio", text: 'Lesson 6 - "Portfolio project"' },
  { page: "/todo", text: 'Lesson 8 - Mini Apps: "Todo App"' },
  { page: "/calculator", text: 'Lesson 8 - Mini Apps: "Basic Calculator"' },
  { page: "/quotes", text: 'Lesson 8 - Mini Apps: "Random Quote Generator"' },
  { page: "/tic-tac-toe", text: 'Lesson 8 - Mini Apps: "Tic-Tac-Toe Game"' },
  { page: "/products", text: 'Lesson 10 - Thema: "Thinking in React"' },
  { page: "/activity", text: 'Lesson 14 - Mini Apps 2: "Activity page of user"' },
  { page: "/jokes", text: 'Lesson 14 - Mini Apps 2: "Jokes app"' }
];

export default function Home() {
  return (
    <div className="home">
      <h1>My Homeworks of&nbsp;React&nbsp;class in&nbsp;
        <a href="https://www.redi-school.org/" target="_blank" rel="noopener noreferrer">ReDI&nbsp;School</a> (IX-X.2023)</h1>
      <div className="home__items">
        {links.map(item => <Link key={item.page} className="home__item" to={item.page}>{item.text}</Link>)}
      </div>
    </div>
  )
}