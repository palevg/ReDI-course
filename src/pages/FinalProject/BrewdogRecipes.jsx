import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import useFetching from "../../hooks/useFetching";
import FilterBar from '../../components/FinalProject/FilterBar';
import Recipe from '../../components/FinalProject/Recipe';
import Loader from "../../components/Loader/Loader";

export default function BrewdogRecipes() {
  const { recipesList, setRecipesList, filterOptions, setFilterOptions, beerData,
    pageToLoad, setPageToLoad, isLoadMore, setIsLoadMore } = useContext(DataContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const listSorting = (list, field) => {
    field === "name" && list.sort((a, b) => a.name > b.name ? 1 : -1);
    field === "nameReverse" && list.sort((a, b) => a.name > b.name ? -1 : 1);
    field === "year" && list.sort((a, b) => a.first_brewed.split("/").reverse().join("/") > b.first_brewed.split("/").reverse().join("/") ? 1 : -1);
    field === "yearReverse" && list.sort((a, b) => a.first_brewed.split("/").reverse().join("/") > b.first_brewed.split("/").reverse().join("/") ? -1 : 1);
    return list;
  };

  const [fetchRecipes, isLoading] = useFetching(async (newSearch, pageToLoad, filterValues) => {
    try {
      const res = await fetch("https://api.punkapi.com/v2/beers?page=" + pageToLoad + filterValues);
      const data = await res.json();
      data.length < beerData.recipesPerPage ? setIsLoadMore(false) : setIsLoadMore(true);
      setPageToLoad(pageToLoad + 1);
      if (newSearch) {
        data.length > 0
          ? setRecipesList(listSorting(data, window.localStorage.getItem(beerData.sorting)))
          : setRecipesList(data)
      } else {
        window.localStorage.setItem(beerData.sorting, '');
        setRecipesList([...recipesList, ...data]);
      }
    } catch (err) {
      return console.log(err);
    }
  });

  const checkLocalStorageItem = (item, value) => {
    if (item && +item !== value) return true
    else return false;
  }

  useEffect(() => {
    const searchValues = {}
    if (searchParams.has(beerData.yearMinName)) {
      window.localStorage.setItem(beerData.yearMinName, searchParams.get(beerData.yearMinName));
      searchValues[beerData.yearMinName] = searchParams.get(beerData.yearMinName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.yearMinName), beerData.yearMin))
      searchValues[beerData.yearMinName] = window.localStorage.getItem(beerData.yearMinName);
    if (searchParams.has(beerData.yearMaxName)) {
      window.localStorage.setItem(beerData.yearMaxName, searchParams.get(beerData.yearMaxName));
      searchValues[beerData.yearMaxName] = searchParams.get(beerData.yearMaxName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.yearMaxName), beerData.yearMax))
      searchValues[beerData.yearMaxName] = window.localStorage.getItem(beerData.yearMaxName);
    if (searchParams.has(beerData.abvMinName)) {
      window.localStorage.setItem(beerData.abvMinName, searchParams.get(beerData.abvMinName));
      searchValues[beerData.abvMinName] = searchParams.get(beerData.abvMinName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.abvMinName), beerData.abvMin))
      searchValues[beerData.abvMinName] = window.localStorage.getItem(beerData.abvMinName);
    if (searchParams.has(beerData.abvMaxName)) {
      window.localStorage.setItem(beerData.abvMaxName, searchParams.get(beerData.abvMaxName));
      searchValues[beerData.abvMaxName] = searchParams.get(beerData.abvMaxName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.abvMaxName), beerData.abvMax))
      searchValues[beerData.abvMaxName] = window.localStorage.getItem(beerData.abvMaxName);
    if (searchParams.has(beerData.ibuMinName)) {
      window.localStorage.setItem(beerData.ibuMinName, searchParams.get(beerData.ibuMinName));
      searchValues[beerData.ibuMinName] = searchParams.get(beerData.ibuMinName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.ibuMinName), beerData.ibuMin))
      searchValues[beerData.ibuMinName] = window.localStorage.getItem(beerData.ibuMinName);
    if (searchParams.has(beerData.ibuMaxName)) {
      window.localStorage.setItem(beerData.ibuMaxName, searchParams.get(beerData.ibuMaxName));
      searchValues[beerData.ibuMaxName] = searchParams.get(beerData.ibuMaxName);
    } else if (checkLocalStorageItem(window.localStorage.getItem(beerData.ibuMaxName), beerData.ibuMax))
      searchValues[beerData.ibuMaxName] = window.localStorage.getItem(beerData.ibuMaxName);
    if (searchParams.has(beerData.name)) {
      window.localStorage.setItem(beerData.name, searchParams.get(beerData.name));
      searchValues[beerData.name] = searchParams.get(beerData.name);
    } else if (window.localStorage.getItem(beerData.name) && window.localStorage.getItem(beerData.name) !== '')
      searchValues[beerData.name] = window.localStorage.getItem(beerData.name);
    setSearchParams(searchValues);

    if (recipesList.length === 0) {
      let filters = "";
      if (beerData.yearMinName in searchValues) filters += "&brewed_after=01-" + searchValues.brewed_year_min;
      if (beerData.yearMaxName in searchValues) filters += "&brewed_before=12-" + searchValues.brewed_year_max;
      if (beerData.abvMinName in searchValues) filters += "&abv_gt=" + searchValues.abv_min;
      if (beerData.abvMaxName in searchValues) filters += "&abv_lt=" + searchValues.abv_max;
      if (beerData.ibuMinName in searchValues) filters += "&ibu_gt=" + searchValues.ibu_min;
      if (beerData.ibuMaxName in searchValues) filters += "&ibu_lt=" + searchValues.ibu_max;
      if (beerData.name in searchValues) filters += "&beer_name=" + searchValues.name;
      setFilterOptions(filters);
      fetchRecipes(true, pageToLoad, filters);
    }
  }, []);

  return <div className="recipes-background">
    <FilterBar fetchRecipes={fetchRecipes} searchParams={searchParams} setSearchParams={setSearchParams} listSorting={listSorting} />
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