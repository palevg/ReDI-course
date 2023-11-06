import { useEffect, useState } from "react";

function Recipe({ recipe }) {
  return <div key={recipe.id} className="recipe">
    <div className="recipe__wrapper">
      <div className="recipe__header">
        <img src={recipe.image_url} alt={recipe.name} />
        <div>
          <h3>{recipe.name}</h3>
          <div className="recipe__button">Show more...</div>
        </div>
      </div>
      <div className="recipe__tag"><i>{recipe.tagline}</i></div>
      <div className="recipe__1st-brewed">First brewed: {recipe.first_brewed}</div>
      <div className="recipe__description">{recipe.description}</div>
    </div>
  </div>
}

export default function BrewdogRecipes() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const res = await fetch("https://api.punkapi.com/v2/beers");
      const data = await res.json();
      return setRecipes(data);
    } catch (err) {
      return console.log(err);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return <div>
    <div>Filter</div>
    <div className="recipes-list">
      {recipes.map(recipe =>
        <Recipe key={recipe.id} recipe={recipe} />
      )}
    </div>
  </div>
}