import { createContext, useState } from "react";

export const DataContext = createContext();

const beerData = {
  yearMinName: "brewed_year_min",
  yearMin: 2007,
  yearMaxName: "brewed_year_max",
  yearMax: new Date().getFullYear(),
  abvMinName: "abv_min",
  abvMin: 0,
  abvMaxName: "abv_max",
  abvMax: 55,
  ibuMinName: "ibu_min",
  ibuMin: 0,
  ibuMaxName: "ibu_max",
  ibuMax: 1250,
  name: "name",
  sorting: "sorting",
  recipesPerPage: 25
}

export const DataContextProvider = ({ children }) => {
  const [recipesList, setRecipesList] = useState([]);
  const [filterOptions, setFilterOptions] = useState('');
  const [pageToLoad, setPageToLoad] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(true);

  return (
    <DataContext.Provider
      value={{
        beerData, recipesList, setRecipesList, filterOptions, setFilterOptions,
        pageToLoad, setPageToLoad, isLoadMore, setIsLoadMore
      }}>
      {children}
    </DataContext.Provider>
  );
}