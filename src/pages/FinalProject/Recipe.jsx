import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetching from "hooks/useFetching";
import Loader from "components/Loader/Loader";
import { MyButton } from "data";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Error from 'pages/Error';

function AddInfo({ hint, header }) {
  return <span className="question">?
    <div className="hint">
      {header && <strong>{header}</strong>}
      {hint}
    </div>
  </span>
}

export default function RecipePage() {
  const params = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  const recipeItem = [
    { name: "First brewed", value: recipe.first_brewed },
    { name: "Description", value: recipe.description },
    {
      name: "ABV", value: recipe.abv + "%", header: "Alcohol by volume. ",
      hint: "In short, ABV stands for alcohol by volume. The number represents the total volume of liquid in a beer that is made up of alcohol. So, the higher the ABV, the more alcoholic the drink."
    },
    {
      name: "IBU", value: recipe.ibu, header: "International Bitterness Units",
      hint: " - is a less discernable abbreviation that is as, if not more, important when it comes to selecting the type of beer that is right for you.  The IBU scale measures the bitterness levels in beer (based on the amount of hops added) and helps beer drinkers determine which styles of brews are ideal for their taste buds.  This scale can be tricky, however, because higher IBU levels do not always equate to bitterer flavor."
    },
    {
      name: "EBC", value: recipe.ebc, header: "EBC stands for European Brewery Convention",
      hint: " and it's used as a measure of colour intensity. The higher the EBC, the darker the beer."
    },
    {
      name: "SRM", value: recipe.srm, header: "Standard Reference Method. ",
      hint: "SRM is the method for color assessment of wort or beer as published in the recommended methods of the American Society of Brewing Chemists."
    },
    {
      name: "pH", value: recipe.ph,
      header: "Ph stands for “power of hydrogen” or “potential of hydrogen”. ",
      hint: "It is the chemical variable that denotes a solution’s acidity or alkalinity. The pH value of a solution indicates its concentration of hydrogen ions. As the concentration of hydrogen ions in a solution decreases, it becomes more alkaline (caustic), that is, its pH value increases. Conversely, as the level of hydrogen ions increases, the solution becomes more acid (corrosive), that is, its pH value decreases."
    },
    {
      name: "Attenuation", value: recipe.attenuation_level,
      header: "Attenuation can range between 0.33 and 0.80, but is usually 0.75. ",
      hint: "Because fermentation produces ethanol, which has a lower density than water (gravity of 0.787 at 25°C), the apparent attenuation overestimates the actual percentage of sugars consumed."
    }
  ];

  const [fetchRecipe, isLoading] = useFetching(async () => {
    try {
      const res = await fetch("https://api.punkapi.com/v2/beers/" + params.id);
      const data = await res.json();
      data.length === 1 ? setRecipe(data[0]) : setRecipe({})
    } catch (err) {
      return console.log(err);
    }
  });

  useEffect(() => {
    fetchRecipe();
  }, [params.id]);

  return isLoading
    ? <div className="recipes-background"><Loader /></div>
    : "name" in recipe
      ? <div className="recipes-background">
        <div>
          <MyButton
            onClick={() => navigate("/brewdog/recipes")}
            sx={{ mt: 2, ml: 4 }}
            variant="contained"
            startIcon={<ChevronLeftIcon />}>Back to the List</MyButton>
          <h2 className="recipe-name">{recipe.name}</h2>
          <div className="recipe-details">
            <div className="recipe-details__img">
              <img src={recipe.image_url} alt={recipe.name} />
            </div>
            <div className="recipe-details__text">
              {recipeItem.map(item =>
                <div key={item.name} className="recipe-details__row">
                  <div className="recipe-details__row-name">
                    {item.name}:
                    {item.hint && <AddInfo hint={item.hint} header={item.header} />}
                  </div>
                  <div className="recipe-details__row-value">{item.value}</div>
                </div>)}
              <div className="recipe-details__row">
                <div className="recipe-details__row-name">Volume:</div>
                <div className="recipe-details__row-value">{recipe.volume.value} {recipe.volume.unit}</div>
              </div>
              <div className="recipe-details__row">
                <div className="recipe-details__row-name">Boil volume:</div>
                <div className="recipe-details__row-value">{recipe.boil_volume.value} {recipe.boil_volume.unit}</div>
              </div>
            </div>
          </div>
          <div className="recipe-details">
            <div className="recipe-details__text">
              <div className="recipe-details__method">Method:</div>
              <ul className="recipe-details__list">
                {recipe.method.mash_temp.length > 0 && <li>Mash temperature:
                  <table className="recipe-details__table">
                    <thead>
                      <tr>
                        <th className="table__data-padding">Temperature</th>
                        <th className="table__data-padding">Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.method.mash_temp.map((mashItem, index) =>
                        <tr key={index + mashItem.temp.value}>
                          <td>{mashItem.temp.value}&#176;{mashItem.temp.unit.toLowerCase() === "celsius" && "C"}</td>
                          <td className="table__data-padding">{mashItem.duration && mashItem.duration}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </li>}
                <li>Fermentation: {recipe.method.fermentation.temp.value}&#176;
                  {recipe.method.fermentation.temp.unit.toLowerCase() === "celsius" && "C"}</li>
                {recipe.method.twist && <li>Twist: {recipe.method.twist}</li>}
              </ul>
              <div className="recipe-details__method">Ingredients:</div>
              <ul className="recipe-details__list">
                {recipe.ingredients.malt.length > 0 && <li>Malt:
                  <table className="recipe-details__table">
                    <thead>
                      <tr>
                        <th className="table__data-padding">Name</th>
                        <th className="table__data-padding">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.malt.map((maltItem, index) =>
                        <tr key={index + maltItem.name}>
                          <td>{maltItem.name}</td>
                          <td className="table__data-padding">{maltItem.amount.value} {maltItem.amount.unit}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </li>}
                {recipe.ingredients.hops.length > 0 && <li>Hops:
                  <table className="recipe-details__table">
                    <thead>
                      <tr>
                        <th className="table__data-padding">Name</th>
                        <th className="table__data-padding">Amount</th>
                        <th className="table__data-padding">Add</th>
                        <th className="table__data-padding">Attribute</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipe.ingredients.hops.map((hopItem, index) =>
                        <tr key={index + hopItem.name}>
                          <td>{hopItem.name}</td>
                          <td className="table__data-padding">{hopItem.amount.value} {hopItem.amount.unit}</td>
                          <td className="table__data-padding">{hopItem.add === undefined ? "---" : hopItem.add}</td>
                          <td className="table__data-padding">{hopItem.attribute === undefined ? "---" : hopItem.attribute}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </li>}
                <li>Yeast: {recipe.ingredients.yeast}</li>
              </ul>
              <div className="recipe-details__method">Food pairing:</div>
              <ul className="recipe-details__list">
                {recipe.food_pairing.map(pair =>
                  <li key={pair}>{pair}</li>
                )}
              </ul>
              <div className="recipe-details__row">
                <div className="recipe-details__row-name">Brewer's tips:</div>
                <div className="recipe-details__row-value">{recipe.brewers_tips}</div>
              </div>
              <div className="recipe-details__row">
                <div className="recipe-details__row-name">Contributed by:</div>
                <div className="recipe-details__row-value">{recipe.contributed_by}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      : <div className="recipes-background"><Error /></div>
}