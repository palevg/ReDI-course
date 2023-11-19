import { createContext, useState } from "react";
import { URL_API } from "../data";

export const DataContext = createContext();

const MinMaxValues = {}

export const DataContextProvider = ({ children }) => {
  const [recipesList, setRecipesList] = useState([]);

  const getRecipes = async () => {
    try {
      const res = await fetch(URL_API);
      const data = await res.json();
      data.forEach((element, index) => {
        if (index === 0) {
          MinMaxValues.yearMin = MinMaxValues.yearMax = element.first_brewed.substr(3, 4);
          MinMaxValues.abvMin = MinMaxValues.abvMax = element.abv;
          MinMaxValues.ibuMin = MinMaxValues.ibuMax = element.ibu;
        }
        else {
          if (element.first_brewed !== null && element.first_brewed.substr(3, 4) > MinMaxValues.yearMax) MinMaxValues.yearMax = element.first_brewed.substr(3, 4);
          if (element.first_brewed !== null && element.first_brewed.substr(3, 4) < MinMaxValues.yearMin) MinMaxValues.yearMin = element.first_brewed.substr(3, 4);
          if (element.abv !== null && element.abv > MinMaxValues.abvMax) MinMaxValues.abvMax = element.abv;
          if (element.abv !== null && element.abv < MinMaxValues.abvMin) MinMaxValues.abvMin = element.abv;
          if (element.ibu !== null && element.ibu > MinMaxValues.ibuMax) MinMaxValues.ibuMax = element.ibu;
          if (element.ibu !== null && element.ibu < MinMaxValues.ibuMin) MinMaxValues.ibuMin = element.ibu;
        }
      });
      return setRecipesList(data);
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <DataContext.Provider value={{ getRecipes, recipesList, MinMaxValues }}>
      {children}
    </DataContext.Provider>
  );
}