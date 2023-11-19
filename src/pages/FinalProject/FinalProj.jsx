import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import '../../styles/finalproj.scss';

export default function FinalProject() {
  const { getRecipes } = useContext(DataContext);

  useEffect(() => {
    getRecipes();
  }, []);

  return <div className="final-project">
    <Link to="/brewdog/recipes">
      <div className="button">View details</div>
    </Link>
    <h1>Brewdog Beer Recipes</h1>
  </div>
}