const buttonSearch = document.querySelector(".buttonSearch");
const inputSearch = document.querySelector("#in1");
const containerInfo = document.querySelector(".containerInfo");
const img = document.querySelector(".pokemonImg");
const namePokemon = document.querySelector(".pokemonName");
const pokemonType = document.querySelector(".pokemonType");
const pokemonAbilities = document.querySelector(".pokemonAbilities");
const pokemonDescription = document.querySelector(".pokemonDescrition");
const containerError = document.querySelector(".containerError")
const buttonEvolution = document.querySelector(".buttonEvolution")

let urlMain = "https://pokeapi.co/api/v2/pokemon/";
let urlSpecies = "https://pokeapi.co/api/v2/pokemon-species/";
let urlEvolution = "https://pokeapi.co/api/v2/evolution-chain/";

const apiMain = async (url) => {
  const res = await axios.get(url);
  return res.data;
};

buttonSearch.addEventListener("click", async () => {
  const data = await apiMain(urlMain + inputSearch.value.toLowerCase()).catch((err) => {
    console.log(err);
    containerError.style.display = "block";
    containerInfo.style.display = "none";
  });

  if (data){
    containerError.style.display = "none";
  }
  
  const pokemonNumber = data.id;
  const dataSpecies = await apiMain(urlSpecies + pokemonNumber);
  const dataEvolution = await apiMain(urlEvolution + pokemonNumber);
  containerInfo.style.display = "block";
  console.log(data, dataSpecies, dataEvolution);

  //name
  namePokemon.textContent = data.name;
  //img
  img.src = data.sprites.other["official-artwork"].front_shiny;
  //type
  const types = data.types;
  const typeNames = types.map((type) => {
    return type.type.name;
  });

  //description
  const description = dataSpecies.flavor_text_entries[26];
  pokemonDescription.textContent = description.flavor_text;

  //abilities
  pokemonType.textContent = typeNames.join(", ");
  const abilities = data.abilities.map((ability) => {
    return ability.ability.name;
  });
  pokemonAbilities.textContent = abilities.join(", ");
});


if ( dataEvolution.chain.evolves_to.species.name == data.name){
  buttonEvolution.style.display = "none";
}else{
  buttonSearch.addEventListener("click", async () => {
      const data = await apiMain(urlMain + inputSearch.value.toLowerCase()).catch((err) => {
      console.log(err);
      containerError.style.display = "block";
      containerInfo.style.display = "none";
    });
  });
}