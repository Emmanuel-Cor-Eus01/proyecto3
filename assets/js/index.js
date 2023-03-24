(()=>{
    function Pokemon(id){
        let url = (`https://pokeapi.co/api/v2/pokemon/`);
        fetch(url+id+`/`)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
        })
    }
    function Pokemons(number){
        for(let i = 1; i = number; i++){
            const pokemon=data[i];
            Pokemons(i);
        }
    }
    Pokemon(9);
})()