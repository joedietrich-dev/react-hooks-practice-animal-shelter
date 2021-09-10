import React, { useEffect, useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  useEffect(() => {
    fetch(`http://localhost:3001/pets`)
      .then(res => res.json())
      .then(setPets);
  }, [])

  const handleOnChangeType = (type) => {
    setFilters(type);
  }
  const handleOnFindPetsClick = () => {
    const search = filters === "all" ? '' : `?type=${filters}`
    fetch(`http://localhost:3001/pets${search}`)
      .then(res => res.json())
      .then(setPets);
  }
  const handleOnAdoptPet = (petId) => {
    setPets(pets.map(pet => pet.id === petId ? { ...pet, isAdopted: true } : pet))
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters
              onChangeType={handleOnChangeType}
              onFindPetsClick={handleOnFindPetsClick}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handleOnAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
