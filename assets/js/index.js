(()=>{
  document.getElementById("prev").addEventListener("click", prev);
  document.getElementById("next").addEventListener("click", next);
  const myChart = document.getElementById('myChart').getContext('2d');
  let myChart1;
  const pokeContent = document.getElementById("poke-content");
  let offset = 1;
  function prev(){
    if (offset != 1) {
      offset -= 1;
      removeChildNodes(pokeContent, myChart1);
      Pokemons(offset);
      if (myChart1){
        myChart1.destroy();
      }
    }
  }
  function next(){
    offset += 1;
  if(offset <= 1010){
      Swal.fire(
          {
              icon: "error",
              title: "Mensaje",
              text: "Ya no hay mas pokemon",
              showCancelButton: true,
              confirmButtonColor: '#A5E041',
              cancelButtonColor: '#FA0CDC',
          }
      );
      return;
  }
  if (myChart1){
    myChart1.destroy();
  }
  removeChildNodes(pokeContent, myChart1);
  Pokemons(offset);
  }
  function Pokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        createPokemon(data);
        stats = data.stats;
        console.log(stats);
        myChart1 = new Chart(myChart, {
          type: 'radar',
          data: {
              labels: ['HP', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'],
              datasets: [{
                  label: 'Habilidades',
                  data: [
                  stats[0].base_stat,
                  stats[1].base_stat,
                  stats[2].base_stat,
                  stats[3].base_stat,
                  stats[4].base_stat,
                  stats[5].base_stat
                ],
                  backgroundColor: [
                      'rgba(224, 240, 242, 0.2)'
                  ],
                  borderColor: [
                      'rgba(224, 240, 242, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
      });
  }

  function Pokemons(offset) {
    for (let i = offset; i <= offset; i++) {
      Pokemon(i);
    }
  }
  function createPokemon(pokemon){
    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardStat = document.createElement("div");
    cardStat.classList.add("poke-grafic");
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardStat);
    pokeContent.appendChild(flipCard);
  }
    function removeChildNodes(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

  Pokemons(offset);
})();