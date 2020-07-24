import React, { useState, useEffect } from 'react';
import './App.css';
import Recipe from './Recipe';
// Api keys
const App = () => {
  const APP_ID = "28983169";
  const APP_KEY = "650c929f9bd66608059e5b3763a34590"
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };
//getting the values in the search box to change
// e is an event handler that listens and triggers actions
  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  
  return (
    <div className="App">
    <form onSubmit={getSearch} className="search-form">
    <input className="search-bar" type="text" placeholder="Search recipe..." value={search} onChange={updateSearch}/>
    <button className= "search-button" type="submit">Search</button>
    </form> 
    <div className="recipes">
    {recipes.map(recipe => (
      <Recipe
      key={recipe.recipe.label} 
      title={recipe.recipe.label} 
      calories={recipe.recipe.calories} 
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients} />
    ))};
    </div>
    </div>
    
  );
}

export default App;
