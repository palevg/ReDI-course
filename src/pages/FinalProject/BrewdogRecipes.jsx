import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import { useFetching } from "../../hooks/useFetching";
import FilterBar from '../../components/FinalProject/FilterBar';
import Recipe from '../../components/FinalProject/Recipe';
import Loader from "../../components/Loader/Loader";

export default function BrewdogRecipes() {
  const { recipesList, setRecipesList, filterOptions, setFilterOptions, MinMaxValues,
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
      data.length < MinMaxValues.recipesPerPage ? setIsLoadMore(false) : setIsLoadMore(true);
      setPageToLoad(pageToLoad + 1);
      if (newSearch) {
        data.length > 0
          ? setRecipesList(listSorting(data, window.localStorage.getItem('sorting')))
          : setRecipesList(data)
      } else {
        window.localStorage.setItem('sorting', '');
        setRecipesList([...recipesList, ...data]);
      }
    } catch (err) {
      return console.log(err);
    }
  });

  useEffect(() => {
    const searchValues = {}
    if (+window.localStorage.getItem("yearMin") !== MinMaxValues.yearMin) searchValues.brewed_year_min = window.localStorage.getItem("yearMin");
    if (+window.localStorage.getItem("yearMax") !== MinMaxValues.yearMax) searchValues.brewed_year_max = window.localStorage.getItem("yearMax");
    if (+window.localStorage.getItem("abvMin") !== MinMaxValues.abvMin) searchValues.abv_min = window.localStorage.getItem("abvMin");
    if (+window.localStorage.getItem("abvMax") !== MinMaxValues.abvMax) searchValues.abv_max = window.localStorage.getItem("abvMax");
    if (+window.localStorage.getItem("ibuMin") !== MinMaxValues.ibuMin) searchValues.ibu_min = window.localStorage.getItem("ibuMin");
    if (+window.localStorage.getItem("ibuMax") !== MinMaxValues.ibuMax) searchValues.ibu_max = window.localStorage.getItem("ibuMax");
    if (window.localStorage.getItem("name") !== '') searchValues.name = window.localStorage.getItem("name");
    setSearchParams(searchValues);

    if (recipesList.length === 0) {
      let filters = "";
      if ("brewed_year_min" in searchValues) filters += "&brewed_after=01-" + searchValues.brewed_year_min;
      if ("brewed_year_max" in searchValues) filters += "&brewed_before=12-" + searchValues.brewed_year_max;
      if ("abv_min" in searchValues) filters += "&abv_gt=" + searchValues.abv_min;
      if ("abv_max" in searchValues) filters += "&abv_lt=" + searchValues.abv_max;
      if ("ibu_min" in searchValues) filters += "&ibu_gt=" + searchValues.ibu_min;
      if ("ibu_max" in searchValues) filters += "&ibu_lt=" + searchValues.ibu_max;
      if ("name" in searchValues) filters += "&beer_name=" + searchValues.name;
      setFilterOptions(filters);
      fetchRecipes(true, pageToLoad, filters);
    }
  }, []);

  return <div className="recipes-background">
    <FilterBar fetchRecipes={fetchRecipes} setSearchParams={setSearchParams} />
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