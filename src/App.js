
import { useEffect, useState } from 'react';
import './App.css';
import video from './food.mp4';
import MyRecipesComponent from './MyRecipesComponent';

function App() {

const MY_ID ="e82042f8";
const MY_KEY ="95df108679f5e1640b778cc2cb05ef97	";



const[mySearch,setMySearch]=useState("");
const [myRecipes,setMyRecipes]=useState([]);
const [wordSubmitted,setWordSubmitted]=useState("avocado");

useEffect(() => {

   async function fetchData(){  
  const response = await fetch(`https://api.edamam.com/search?q=${wordSubmitted}&app_id=${MY_ID}&app_key=${MY_KEY}`);
  const data = await response.json()
  setMyRecipes(data.hits);
}
fetchData();
},[wordSubmitted]);

 const myRecipeSearch=(e)=>{
    setMySearch(e.target.value)
}

const finalSearch=(e)=>{
  e.preventDefault();
  setWordSubmitted(mySearch);

}


  return (
    <div className="App">
      <div className="container">

      <video autoPlay muted loop>
          <source src={video}type="video/mp4"/>
      </video>

        <h1>Find a Recipe</h1>
      </div>

      <div className="container">
        <form onSubmit={finalSearch}>
          <input className='search'placeholder='search....'onChange={myRecipeSearch} value={mySearch}>
          </input>
        </form>
        </div>

      <div className='container'>
            <button>
            <img src="https://img.icons8.com/color/96/fry.png"width="50px"alt="icon"/>
            </button>
    </div>

   <div >
       {myRecipes.map((element,index) =>( 
        
        <MyRecipesComponent key={index}
        label={element.recipe.label}
        image={element.recipe.image}
        calories={element.recipe.calories}ingredients={element.recipe.ingredientLines}/>
))}
</div>


      
  </div>

  );
}

export default App;
