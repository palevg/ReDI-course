import { Link } from 'react-router-dom';
import "../styles/header.css";

export default function Header() {
  const handleMenuClick = () => {
    const elem = document.getElementById("side-menu");
    if (elem.checked) elem.checked = false;
  }

  return (
    <header className="header">
      <Link to="/" className='logo' onClick={handleMenuClick}>Home</Link>
      <input className="side-menu" type="checkbox" id="side-menu" />
      <label className="hamb" htmlFor="side-menu"><span className="hamb-line"></span></label>
      <nav className="nav">
        <ul className="menu" onClick={handleMenuClick}>
          <li><Link to="/todo">ToDo App</Link></li>
          <li><Link to="/calculator">Calculator</Link></li>
          <li><Link to="/quotes">Quotes</Link></li>
          <li><Link to="/tic-tac-toe">Tic-Tac-Toe</Link></li>
          <li><Link to="/brewdog">Project</Link></li>
        </ul>
      </nav>
    </header>
  )
}