import { Link } from 'react-router-dom';
import '../styles/finalproj.scss';

export default function FinalProject() {
  return <div className="final-project">
    <Link to="/brewdog/recipes">
      <div className="button">View details</div>
    </Link>
    <h1>Brewdog Beer Recipes</h1>
  </div>
}