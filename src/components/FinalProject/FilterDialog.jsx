import { useState, useContext, useEffect } from 'react';
import { DataContext } from "../../context/DataContext";
import { Dialog, Box, DialogContent, TextField, DialogActions, Typography, Slider, Button } from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

export default function FilterDialog({ openDialog, setOpenDialog, fetchRecipes, setSearchParams }) {
  const { MinMaxValues, setFilterOptions } = useContext(DataContext);
  const [searchName, setSearchName] = useState('');
  const [yearValue, setYearValue] = useState([MinMaxValues.yearMin, MinMaxValues.yearMax]);
  const [abvValue, setAbvValue] = useState([MinMaxValues.abvMin, MinMaxValues.abvMax]);
  const [ibuValue, setIbuValue] = useState([MinMaxValues.ibuMin, MinMaxValues.ibuMax]);

  function handleClearFilters() {
    setSearchName('');
    setYearValue([MinMaxValues.yearMin, MinMaxValues.yearMax]);
    setAbvValue([MinMaxValues.abvMin, MinMaxValues.abvMax]);
    setIbuValue([MinMaxValues.ibuMin, MinMaxValues.ibuMax]);
  }

  function handleSetFilters() {
    window.localStorage.setItem("name", searchName);
    window.localStorage.setItem("yearMin", yearValue[0]);
    window.localStorage.setItem("yearMax", yearValue[1]);
    window.localStorage.setItem("abvMin", abvValue[0]);
    window.localStorage.setItem("abvMax", abvValue[1]);
    window.localStorage.setItem("ibuMin", ibuValue[0]);
    window.localStorage.setItem("ibuMax", ibuValue[1]);

    const searchValues = {}
    let filters = '';
    if (yearValue[0] !== MinMaxValues.yearMin) {
      filters += "&brewed_after=01-" + yearValue[0];
      searchValues.brewed_year_min = yearValue[0];
    }
    if (yearValue[1] !== MinMaxValues.yearMax) {
      filters += "&brewed_before=12-" + yearValue[1];
      searchValues.brewed_year_max = yearValue[1];
    }
    if (abvValue[0] !== MinMaxValues.abvMin) {
      filters += "&abv_gt=" + abvValue[0];
      searchValues.abv_min = abvValue[0];
    }
    if (abvValue[1] !== MinMaxValues.abvMax) {
      filters += "&abv_lt=" + abvValue[1];
      searchValues.abv_max = abvValue[1];
    }
    if (ibuValue[0] !== MinMaxValues.ibuMin) {
      filters += "&ibu_gt=" + ibuValue[0];
      searchValues.ibu_min = ibuValue[0];
    }
    if (ibuValue[1] !== MinMaxValues.ibuMax) {
      filters += "&ibu_lt=" + ibuValue[1];
      searchValues.ibu_max = ibuValue[1];
    }
    if (searchName !== '') {
      filters += "&beer_name=" + searchName;
      searchValues.name = searchName;
    }
    setFilterOptions(filters);
    setSearchParams(searchValues);
    fetchRecipes(true, 1, filters);
    setOpenDialog(false);
  }

  useEffect(() => {
    setSearchName(window.localStorage.getItem('name') || '');
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
          min={MinMaxValues.yearMin}
          max={MinMaxValues.yearMax}
          marks={[{ value: MinMaxValues.yearMin, label: MinMaxValues.yearMin }, { value: MinMaxValues.yearMax, label: MinMaxValues.yearMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Alcohol by volume (%)</Typography>
        <Slider
          getAriaLabel={() => 'Alcohol range'}
          sx={{ width: "98%" }}
          value={abvValue}
          onChange={(event, newValue) => setAbvValue(newValue)}
          valueLabelDisplay="auto"
          min={MinMaxValues.abvMin}
          max={MinMaxValues.abvMax}
          marks={[{ value: MinMaxValues.abvMin, label: MinMaxValues.abvMin }, { value: MinMaxValues.abvMax, label: MinMaxValues.abvMax }]}
        />
        <Typography sx={{ mt: 2 }} gutterBottom>Beer's IBU (bitterness)</Typography>
        <Slider
          getAriaLabel={() => 'Bitterness range'}
          sx={{ width: "98%" }}
          value={ibuValue}
          onChange={(event, newValue) => setIbuValue(newValue)}
          valueLabelDisplay="auto"
          min={MinMaxValues.ibuMin}
          max={MinMaxValues.ibuMax}
          marks={[{ value: MinMaxValues.ibuMin, label: MinMaxValues.ibuMin }, { value: MinMaxValues.ibuMax, label: MinMaxValues.ibuMax }]}
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