import { useState } from "react";
import { animals } from "../data";
import "../styles/animals.css";
import Animals from "../components/Animals";
import FilterBar from "../components/FilterBar";

export default function AnimalsPage() {
  const [selectorsChoice, setSelectorsChoice] = useState(false);
  const selectorsChoiceAnimals = animals.filter(animal => animal.selectorsChoice);

  return (
    <div className="animals-app">
      <FilterBar isFiltered={selectorsChoice} updateFilter={setSelectorsChoice} />
      <Animals list={selectorsChoice ? selectorsChoiceAnimals : animals} />
    </div>
  );
};