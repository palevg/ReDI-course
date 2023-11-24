import { useContext, useEffect } from 'react';
import { DataContext } from "../../context/DataContext";
import { useFetching } from "../../hooks/useFetching";
import FilterBar from '../../components/FinalProject/FilterBar';
import Recipe from '../../components/FinalProject/Recipe';
import Loader from "../../components/Loader/Loader";

export default function BrewdogRecipes() {
  const { recipesList, setRecipesList, MinMaxValues, pageToLoad, setPageToLoad,
    filterOptions, setFilterOptions, isLoadMore, setIsLoadMore } = useContext(DataContext);

  const [fetchRecipes, isLoading] = useFetching(async (newSearch, pageToLoad, filterOptions) => {
    try {
      const res = await fetch("https://api.punkapi.com/v2/beers?page=" + pageToLoad + filterOptions);
      const data = await res.json();
      data.length < MinMaxValues.recipesPerPage ? setIsLoadMore(false) : setIsLoadMore(true);
      setPageToLoad(pageToLoad + 1);
      window.localStorage.setItem('sorting', '');
      if (newSearch) {
        setPageToLoad(2);
        setRecipesList(data);
      } else {
        setPageToLoad(pageToLoad + 1);
        setRecipesList([...recipesList, ...data]);
      }
    } catch (err) {
      return console.log(err);
    }
  });

  const getStorageItem = (item, minMaxValue) => {
    let itemValue;
    window.localStorage.getItem(item)
      ? itemValue = +window.localStorage.getItem(item)
      : itemValue = minMaxValue
    return itemValue;
  }

  useEffect(() => {
    const userFilter = {}
    userFilter.yearMin = getStorageItem('yearMin', MinMaxValues.yearMin);
    userFilter.yearMax = getStorageItem('yearMax', MinMaxValues.yearMax);
    userFilter.abvMin = getStorageItem('abvMin', MinMaxValues.abvMin);
    userFilter.abvMax = getStorageItem('abvMax', MinMaxValues.abvMax);
    userFilter.ibuMin = getStorageItem('ibuMin', MinMaxValues.ibuMin);
    userFilter.ibuMax = getStorageItem('ibuMax', MinMaxValues.ibuMax);

    let filters = '';
    if (userFilter.yearMin !== MinMaxValues.yearMin) filters += "&brewed_after=01-" + userFilter.yearMin;
    if (userFilter.yearMax !== MinMaxValues.yearMax) filters += "&brewed_before=12-" + userFilter.yearMax;
    if (userFilter.abvMin !== MinMaxValues.abvMin) filters += "&abv_gt=" + userFilter.abvMin;
    if (userFilter.abvMax !== MinMaxValues.abvMax) filters += "&abv_lt=" + userFilter.abvMax;
    if (userFilter.ibuMin !== MinMaxValues.ibuMin) filters += "&ibu_gt=" + userFilter.ibuMin;
    if (userFilter.ibuMax !== MinMaxValues.ibuMax) filters += "&ibu_lt=" + userFilter.ibuMax;
    setFilterOptions(filters);

    if (recipesList.length === 0) {
      fetchRecipes(false, pageToLoad, filters);
    }
  }, []);

  return <div className="recipes-background">
    <FilterBar fetchRecipes={fetchRecipes} />
    {recipesList.length > 0
      ? <div className="recipes-list">
        {recipesList.map(recipe =>
          <Recipe key={recipe.id} recipe={recipe} />
        )}
        {isLoadMore && <div
          className="load-more"
          onClick={() => fetchRecipes(false, pageToLoad, filterOptions)}
        ><div>Load more...</div>
        </div>}
      </div>
      : isLoading
        ? <Loader />
        : <div className="empty-list">
          <h2>No recipe was found with the specified data</h2>
          <h3>Change your search filters!</h3>
        </div>
    }
  </div>
}