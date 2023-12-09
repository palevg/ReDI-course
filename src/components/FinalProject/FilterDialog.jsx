import { useState, useContext } from 'react';
import { DataContext } from "context/DataContext";
import { Dialog, Box, DialogContent, TextField, DialogActions, Typography, Slider, Button } from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function FilterDialog({ openDialog, setOpenDialog, fetchRecipes, searchParams, setSearchParams }) {
  const { beerData, setFilterOptions } = useContext(DataContext);
  const [searchName, setSearchName] = useState(searchParams.get(beerData.name) || window.localStorage.getItem(beerData.name) || '');
  const [yearValue, setYearValue] = useState([+searchParams.get(beerData.yearMinName) || +window.localStorage.getItem(beerData.yearMinName) || beerData.yearMin,
    +searchParams.get(beerData.yearMaxName) || +window.localStorage.getItem(beerData.yearMaxName) || beerData.yearMax]);
  const [abvValue, setAbvValue] = useState([+searchParams.get(beerData.abvMinName) || +window.localStorage.getItem(beerData.abvMinName) || beerData.abvMin,
    +searchParams.get(beerData.abvMaxName) || +window.localStorage.getItem(beerData.abvMaxName) || beerData.abvMax]);
  const [ibuValue, setIbuValue] = useState([+searchParams.get(beerData.ibuMinName) || +window.localStorage.getItem(beerData.ibuMinName) || beerData.ibuMin,
    +searchParams.get(beerData.ibuMaxName) || +window.localStorage.getItem(beerData.ibuMaxName) || beerData.ibuMax]);

  function handleClearFilters() {
    setSearchName('');
    setYearValue([beerData.yearMin, beerData.yearMax]);
    setAbvValue([beerData.abvMin, beerData.abvMax]);
    setIbuValue([beerData.ibuMin, beerData.ibuMax]);
  }

  function handleSetFilters() {
    window.localStorage.setItem(beerData.name, searchName);
    window.localStorage.setItem(beerData.yearMinName, yearValue[0]);
    window.localStorage.setItem(beerData.yearMaxName, yearValue[1]);
    window.localStorage.setItem(beerData.abvMinName, abvValue[0]);
    window.localStorage.setItem(beerData.abvMaxName, abvValue[1]);
    window.localStorage.setItem(beerData.ibuMinName, ibuValue[0]);
    window.localStorage.setItem(beerData.ibuMaxName, ibuValue[1]);

    const searchValues = {}
    let filters = '';
    if (yearValue[0] !== beerData.yearMin) {
      filters += "&brewed_after=01-" + yearValue[0];
      searchValues[beerData.yearMinName] = yearValue[0];
    }
    if (yearValue[1] !== beerData.yearMax) {
      filters += "&brewed_before=12-" + yearValue[1];
      searchValues[beerData.yearMaxName] = yearValue[1];
    }
    if (abvValue[0] !== beerData.abvMin) {
      filters += "&abv_gt=" + abvValue[0];
      searchValues[beerData.abvMinName] = abvValue[0];
    }
    if (abvValue[1] !== beerData.abvMax) {
      filters += "&abv_lt=" + abvValue[1];
      searchValues[beerData.abvMaxName] = abvValue[1];
    }
    if (ibuValue[0] !== beerData.ibuMin) {
      filters += "&ibu_gt=" + ibuValue[0];
      searchValues[beerData.ibuMinName] = ibuValue[0];
    }
    if (ibuValue[1] !== beerData.ibuMax) {
      filters += "&ibu_lt=" + ibuValue[1];
      searchValues[beerData.ibuMaxName] = ibuValue[1];
    }
    if (searchName !== '') {
      filters += "&beer_name=" + searchName;
      searchValues[beerData.name] = searchName;
    }
    setFilterOptions(filters);
    setSearchParams(searchValues);
    fetchRecipes(true, 1, filters);
    setOpenDialog(false);
  }

  return <Dialog maxWidth="xs" open={openDialog}>
    <Box sx={{ p: 1 }}>
      <DialogContent>
        <TextField
          label="Beer's name contains"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
          size="small"
          sx={{ mb: 2 }}
          fullWidth
        />
        <Typography gutterBottom>Year of first brewed</Typography>
        <Slider
          getAriaLabel={() => 'Year range'}
          sx={{ width: "98%" }}
          value={yearValue}
          onChange={(event, newValue) => setYearValue(newValue)}
          valueLabelDisplay="auto"
          min={beerData.yearMin}
          max={beerData.yearMax}
          marks={[{ value: beerData.yearMin, label: beerData.yearMin }, { value: beerData.yearMax, label: beerData.yearMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Alcohol by volume (%)</Typography>
        <Slider
          getAriaLabel={() => 'Alcohol range'}
          sx={{ width: "98%" }}
          value={abvValue}
          onChange={(event, newValue) => setAbvValue(newValue)}
          valueLabelDisplay="auto"
          min={beerData.abvMin}
          max={beerData.abvMax}
          marks={[{ value: beerData.abvMin, label: beerData.abvMin }, { value: beerData.abvMax, label: beerData.abvMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Beer's IBU (bitterness)</Typography>
        <Slider
          getAriaLabel={() => 'Bitterness range'}
          sx={{ width: "98%" }}
          value={ibuValue}
          onChange={(event, newValue) => setIbuValue(newValue)}
          valueLabelDisplay="auto"
          min={beerData.ibuMin}
          max={beerData.ibuMax}
          marks={[{ value: beerData.ibuMin, label: beerData.ibuMin }, { value: beerData.ibuMax, label: beerData.ibuMax }]}
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