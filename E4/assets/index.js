/*
Para esta entrega vamos a trabajar con asincronismo, utilizando la API de Pokemon.

Deberán:

👉 Crear un input de tipo number ,un botón y un contenedor vacío tal como hicimos en las entregas anteriores.
👉 Con el número que se ponga, hacer una llamada a la pokeapi y renderizar una card con los datos del Pokémon encontrado. Lo mínimo que deberá tener la card es el nombre, su tipo principal (pueden intentar poner todos) , su altura y peso (expresada en metros y kilogramos, tendrán que dividir el alto y peso que les llegue por 10), y una de sus imágenes.

👉 En caso de que no se encuentre ningún pokemon, renderizar un mensaje de error. En caso de que no se ingrese un número, renderizar otro mensaje de error acorde.



Les dejamos un ejemplo de como puede ser la llamada a la API:
👉 https://pokeapi.co/api/v2/pokemon/890

Revisen la API (https://pokeapi.co/) , investiguen el objeto y vean como conseguir los datos que necesitan.

🆙 Entregar el link de Github , en el cual debe estar linkeado el deploy del Vercel de su aplicación (mediante Github nosotros deberíamos poder ver el Vercel vinculado a su repositorio). 

*/
const botonPokemon = document.getElementById("button"); //button
const err0r = document.getElementById("error"); // span
const input = document.getElementById("input"); //
const caja = document.getElementById("caja");
const loader = document.querySelector(".pokeballs-container");

let idActual;
let promesas = [];
//https://pokeapi.co/api/v2/language/7
const pokeFetch = async (id) => {
  try {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const result = await promise.json();
    promesas = [];
    promesas.push(result);
    idActual = id;
    caja.innerHTML = ` 
      <div class="poke">
      <img src="${promesas[0].sprites.other.home.front_default}"/>
      <h2>${promesas[0].name.toUpperCase()}</h2>
    <span class="exp">EXP:${promesas[0].base_experience}</span>
    <div class="tipo-poke">${promesas[0].types
      .map((tipo) => {
        return `<span class="${tipo.type.name} poke__type"> ${tipo.type.name} </span>`;
      })
      .join("")}
      </div>
      <p class:"id-poke"> #${promesas[0].id}<p>
      <p class:"height"> #${promesas[0].height / 10}m<p>
      <p class:"weight"> #${promesas[0].weight / 10}Kg<p>
    </div>
    
    `;
  } catch (error) {
    const cantPokemones = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const resultDos = await cantPokemones.json();
    if (resultDos.count < input.value) {
      caja.innerHTML = `<span>Hay ${resultDos.count} Pokemones en la nomina</span>`;
      console.log("No se ah encontrado la pagina solicitada = ", error);
    } else {
      caja.innerHTML = `<span>POKEMON CLASIFICADO, NO TENEMOS DATOS DEL MISMO</span>`;
    }
  }
};

const loadAndPrint = () => {
  loader.classList.add("show");
  setTimeout(() => {
    loader.classList.remove("show");
    pokeFetch(input.value);
  }, 3500);
};
const init = () => {
  botonPokemon.addEventListener("click", () => {
    if (input.value === "") {
      return (caja.innerHTML = `No se ingresó valor`);
    } else if (input.value < 1) {
      return (caja.innerHTML = `El numero "${input.value}" no es valido`);
    } else if (input.value === idActual) {
      caja.innerHTML = `<span>Error ID Ya Ingresado </span>`;
    } else {
      loadAndPrint();
      return;
    }
  });
};

init();