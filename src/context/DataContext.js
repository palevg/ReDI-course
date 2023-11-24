import { createContext, useState } from "react";

export const DataContext = createContext();

const MinMaxValues = {
  yearMin: 2007,
  yearMax: new Date().getFullYear(),
  abvMin: 0,
  abvMax: 55,
  ibuMin: 0,
  ibuMax: 1250,
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
        recipesList, setRecipesList, MinMaxValues, pageToLoad, setPageToLoad,
        filterOptions, setFilterOptions, isLoadMore, setIsLoadMore
      }}>
      {children}
    </DataContext.Provider>
  );
}