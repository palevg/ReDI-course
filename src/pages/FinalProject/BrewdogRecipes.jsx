import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import { URL_API, MyButton } from '../../data';
import { Dialog, Box, DialogContent, DialogActions, TextField, MenuItem, Typography, Slider, Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

function FilterBar({ setFilteredList, filterText, setFilterText }) {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  return <div className="recipes-filter">
    <MyButton
      onClick={() => navigate("/brewdog")}
      variant="contained"
      startIcon={<ChevronLeftIcon />}>Brewdog main page</MyButton>
    <Typography sx={{ mt: 1, fontSize: 14 }}>{filterText}</Typography>
    <MyButton
      onClick={() => setOpenDialog(true)}
      variant="contained"
      startIcon={<FilterAltIcon />}>Filter & Sort</MyButton>
    <FilterDialog openDialog={openDialog} setOpenDialog={setOpenDialog} setFilteredList={setFilteredList} setFilterText={setFilterText} />
  </div>
}

function updateFilteredList(yearValue, abvValue, ibuValue, recipesList, sortValue) {
  const newList = [];
  recipesList.forEach(element => {
    let isFiltered = true;
    if (!(+element.first_brewed.substr(3, 4) >= yearValue[0] && +element.first_brewed.substr(3, 4) <= yearValue[1])) isFiltered = false;
    if (isFiltered && element.abv !== null)
      if (!(+element.abv >= abvValue[0] && +element.abv <= abvValue[1])) isFiltered = false;
    if (isFiltered && element.ibu !== null)
      if (!(+element.ibu >= ibuValue[0] && +element.ibu <= ibuValue[1])) isFiltered = false;
    isFiltered && newList.push(element);
  });
  sortValue === "name" && newList.sort((a, b) => a.name > b.name ? 1 : -1);
  sortValue === "nameReverse" && newList.sort((a, b) => a.name > b.name ? -1 : 1);
  sortValue === "year" && newList.sort((a, b) => a.first_brewed.split("/").reverse().join("/") > b.first_brewed.split("/").reverse().join("/") ? 1 : -1);
  sortValue === "yearReverse" && newList.sort((a, b) => a.first_brewed.split("/").reverse().join("/") > b.first_brewed.split("/").reverse().join("/") ? -1 : 1);
  return newList;
}

const sortFields = [
  { value: 'name', label: 'Name (A → Z)' },
  { value: 'nameReverse', label: 'Name (Z → A)' },
  { value: 'year', label: 'First brewed year (old → new)' },
  { value: 'yearReverse', label: 'First brewed year (new → old)' }
];

function FilterDialog({ openDialog, setOpenDialog, setFilteredList, setFilterText }) {
  const { recipesList, MinMaxValues } = useContext(DataContext);
  const [yearValue, setYearValue] = useState([+MinMaxValues.yearMin, +MinMaxValues.yearMax]);
  const [abvValue, setAbvValue] = useState([+MinMaxValues.abvMin, +MinMaxValues.abvMax]);
  const [ibuValue, setIbuValue] = useState([+MinMaxValues.ibuMin, +MinMaxValues.ibuMax]);
  const [sortValue, setSortValue] = useState(sortFields[0].value);

  function handleClearFilters() {
    setYearValue([+MinMaxValues.yearMin, +MinMaxValues.yearMax]);
    setAbvValue([+MinMaxValues.abvMin, +MinMaxValues.abvMax]);
    setIbuValue([+MinMaxValues.ibuMin, +MinMaxValues.ibuMax]);
  }

  function handleSetFilters() {
    window.localStorage.setItem("yearMin", yearValue[0]);
    window.localStorage.setItem("yearMax", yearValue[1]);
    window.localStorage.setItem("abvMin", abvValue[0]);
    window.localStorage.setItem("abvMax", abvValue[1]);
    window.localStorage.setItem("ibuMin", ibuValue[0]);
    window.localStorage.setItem("ibuMax", ibuValue[1]);
    window.localStorage.setItem("sorting", sortValue);
    setFilterText(`Filtered: years ${yearValue[0]}-${yearValue[1]}; ABV ${abvValue[0]}-${abvValue[1]}; IBU ${ibuValue[0]}-${ibuValue[1]}. Sorted by ${sortFields.filter(field => field.value === sortValue)[0].label}`);
    setFilteredList(updateFilteredList(yearValue, abvValue, ibuValue, recipesList, sortValue));
    setOpenDialog(false);
  }

  useEffect(() => {
    if (window.localStorage.getItem('sorting')) setSortValue(window.localStorage.getItem('sorting'));
    if (window.localStorage.getItem('yearMin') && window.localStorage.getItem('yearMax'))
      setYearValue([+window.localStorage.getItem('yearMin'), +window.localStorage.getItem('yearMax')]);
    if (window.localStorage.getItem('abvMin') && window.localStorage.getItem('abvMax'))
      setAbvValue([+window.localStorage.getItem('abvMin'), +window.localStorage.getItem('abvMax')]);
    if (window.localStorage.getItem('ibuMin') && window.localStorage.getItem('ibuMax'))
      setIbuValue([+window.localStorage.getItem('ibuMin'), +window.localStorage.getItem('ibuMax')]);
  }, []);

  return <Dialog maxWidth="xs" open={openDialog}>
    <Box sx={{ p: 1 }}>
      <DialogContent>
        <TextField
          select
          label="Sort by"
          value={sortValue}
          onChange={(event) => setSortValue(event.target.value)}
          size="small"
          sx={{ mb: 2 }}
          fullWidth
        >
          {sortFields.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography gutterBottom>Year of first brewed</Typography>
        <Slider
          getAriaLabel={() => 'Year range'}
          sx={{ width: "98%" }}
          value={yearValue}
          onChange={(event, newValue) => setYearValue(newValue)}
          valueLabelDisplay="auto"
          min={+MinMaxValues.yearMin}
          max={+MinMaxValues.yearMax}
          marks={[{ value: +MinMaxValues.yearMin, label: MinMaxValues.yearMin }, { value: +MinMaxValues.yearMax, label: MinMaxValues.yearMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Alcohol by volume (%)</Typography>
        <Slider
          getAriaLabel={() => 'Alcohol range'}
          sx={{ width: "98%" }}
          value={abvValue}
          onChange={(event, newValue) => setAbvValue(newValue)}
          valueLabelDisplay="auto"
          min={+MinMaxValues.abvMin}
          max={+MinMaxValues.abvMax}
          marks={[{ value: +MinMaxValues.abvMin, label: MinMaxValues.abvMin }, { value: +MinMaxValues.abvMax, label: MinMaxValues.abvMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Beer's IBU (bitterness)</Typography>
        <Slider
          getAriaLabel={() => 'Bitterness range'}
          sx={{ width: "98%" }}
          value={ibuValue}
          onChange={(event, newValue) => setIbuValue(newValue)}
          valueLabelDisplay="auto"
          min={+MinMaxValues.ibuMin}
          max={+MinMaxValues.ibuMax}
          marks={[{ value: +MinMaxValues.ibuMin, label: MinMaxValues.ibuMin }, { value: +MinMaxValues.ibuMax, label: MinMaxValues.ibuMax }]}
        />
        <Button
          onClick={handleClearFilters}
          variant="outlined"
          sx={{ mt: 1 }}
          startIcon={<FilterAltOffIcon />}
          fullWidth>Clear all filters</Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetFilters} variant="contained">Ok</Button>
        <Button onClick={() => setOpenDialog(false)} variant="outlined">Cancel</Button>
      </DialogActions>
    </Box>
  </Dialog>
}

function Recipe({ recipe }) {
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

export default function BrewdogRecipes() {
  const { recipesList, getRecipes, MinMaxValues } = useContext(DataContext);
  const [filteredList, setFilteredList] = useState(recipesList);
  const [filterText, setFilterText] = useState("");

  const reloadRecipes = async () => {
    try {
      const res = await fetch(URL_API);
      const data = await res.json();
      return setFilteredList(data);
    } catch (err) {
      return console.log(err);
    }
  };

  const getStorageItem = (item, minMaxValue) => {
    let itemValue;
    window.localStorage.getItem(item)
      ? itemValue = +window.localStorage.getItem(item)
      : itemValue = +minMaxValue
    return itemValue;
  }

  useEffect(() => {
    if (recipesList.length === 0) {
      reloadRecipes();
      getRecipes();
    }
    const userFilter = {}
    userFilter.yearMin = getStorageItem('yearMin', MinMaxValues.yearMin);
    userFilter.yearMax = getStorageItem('yearMax', MinMaxValues.yearMax);
    userFilter.abvMin = getStorageItem('abvMin', MinMaxValues.abvMin);
    userFilter.abvMax = getStorageItem('abvMax', MinMaxValues.abvMax);
    userFilter.ibuMin = getStorageItem('ibuMin', MinMaxValues.ibuMin);
    userFilter.ibuMax = getStorageItem('ibuMax', MinMaxValues.ibuMax);
    window.localStorage.getItem('sorting')
      ? userFilter.sorting = window.localStorage.getItem('sorting')
      : userFilter.sorting = "name"
    setFilterText(`Filtered: years ${userFilter.yearMin}-${userFilter.yearMax}; ABV ${userFilter.abvMin}-${userFilter.abvMax}; IBU ${userFilter.ibuMin}-${userFilter.ibuMax}. Sorted by ${sortFields.filter(field => field.value === userFilter.sorting)[0].label}`);
    setFilteredList(updateFilteredList([userFilter.yearMin, userFilter.yearMax], [userFilter.abvMin, userFilter.abvMax], [userFilter.ibuMin, userFilter.ibuMax], recipesList, userFilter.sorting));
  }, []);

  return <div className="recipes-background">
    <FilterBar setFilteredList={setFilteredList} filterText={filterText} setFilterText={setFilterText} />
    {filteredList.length > 0
      ? <div className="recipes-list">
        {filteredList.map(recipe =>
          <Recipe key={recipe.id} recipe={recipe} />
        )}
      </div>
      : <div className="empty-list">
        <h2>No recipe was found with the specified data</h2>
        <h3>Change your search filters!</h3>
      </div>
    }
  </div>
}