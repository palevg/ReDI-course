const FilterBar = ({ isFiltered, updateFilter }) => {

  return (<div className="animals-header">
    <div className="animals-header__nav">
      <div
        className={isFiltered ? "animals-header-mi" : "animals-header-mi animals-header-active"}
        onClick={() => updateFilter(false)}>
        All Cute Animals
      </div>
      <div
        className={isFiltered ? "animals-header-mi animals-header-active" : "animals-header-mi"}
        onClick={() => updateFilter(true)}>
        Selectors Choice
      </div>
    </div>
    <div className="animals-header__logo"></div>
  </div>);
}

export default FilterBar;