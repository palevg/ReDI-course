import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from "../../context/DataContext";
import { MyButton } from '../../data';
import { Menu, MenuItem } from "@mui/material";
import FilterDialog from './FilterDialog';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SortIcon from '@mui/icons-material/Sort';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const sortFields = [
  { value: 'name', label: 'Name (A → Z)' },
  { value: 'nameReverse', label: 'Name (Z → A)' },
  { value: 'year', label: 'First brewed year (old → new)' },
  { value: 'yearReverse', label: 'First brewed year (new → old)' }
];

export default function FilterBar({ fetchRecipes, setSearchParams, listSorting }) {
  const { recipesList, setRecipesList } = useContext(DataContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleChangeSort = (type) => {
    if (window.localStorage.getItem('sorting') !== type) {
      window.localStorage.setItem('sorting', type);
      recipesList.length > 0 && setRecipesList(listSorting([...recipesList], type));
    }
    setAnchorEl(null);
  };

  return <div className="recipes-filter">
    <MyButton
      onClick={() => navigate("/brewdog")}
      variant="contained"
      startIcon={<ChevronLeftIcon />}>Brewdog main page</MyButton>
    <div>
      <MyButton
        id="sort-button"
        variant="contained"
        sx={{ mr: 1 }}
        startIcon={<SortIcon />}
        aria-controls={Boolean(anchorEl) ? 'sort-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        Sort
      </MyButton>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{ 'aria-labelledby': 'sort-button' }}
      >
        {sortFields.map(option =>
          <MenuItem
            key={option.value}
            onClick={() => handleChangeSort(option.value)}
            sx={{ fontWeight: window.localStorage.getItem('sorting') === option.value ? "600" : "400" }}
          >{option.label}</MenuItem>
        )}
      </Menu>
      <MyButton
        onClick={() => setOpenDialog(true)}
        variant="contained"
        startIcon={<FilterAltIcon />}>Filter</MyButton>
    </div>
    <FilterDialog
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      fetchRecipes={fetchRecipes}
      setSearchParams={setSearchParams} />
  </div>
}