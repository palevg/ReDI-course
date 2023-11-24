import { useNavigate } from 'react-router-dom';
import { MyButton } from '../../data';

export default function Recipe({ recipe }) {
  const navigate = useNavigate();

  return <div key={recipe.id} className="recipe">
    <div className="recipe__wrapper">
      <div className="recipe__header">
        <img src={recipe.image_url} alt={recipe.name} />
        <div>
          <h3>{recipe.name}</h3>
          <MyButton
            onClick={() => navigate("/brewdog/recipes/" + recipe.id)}
            className="recipe__button"
            variant="contained">Show more</MyButton>
        </div>
      </div>
      <div className="recipe__tag"><i>{recipe.tagline}</i></div>
      <div className="recipe__1st-brewed">First brewed: {recipe.first_brewed}</div>
      <div className="recipe__description">{recipe.description}</div>
    </div>
  </div>
}