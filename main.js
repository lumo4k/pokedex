

let offset = 0;
let limit = 9;
let pokemon = '';

let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}?offset=${offset}&limit=${limit}`;

fetch(url)
    .then( (res) => res.json())
    .then( (res) => {
        let resultado = res.results

        resultado.forEach(element => {
            fetch(element.url)
                .then( (res) => res.json() )
                .then( (res) => {
                    let habilidades = res.abilities

                    document.querySelector('.container-pokedex').innerHTML += `<div class="container-pokemon ${res.name}"></div>`
                    let qry = '.container-pokemon.' + res.name
                    document.querySelector(qry).innerHTML += (`<h3>${captalizeLetter(res.name)}</h3><br>`)
                    document.querySelector(qry).innerHTML += (`<h3>Tipos:</h3><br>`)

                    res.types.forEach(element => {
                        document.querySelector(qry).innerHTML += (`<h3>${captalizeLetter(element.type.name)}</h3>`)
                    });

                    document.querySelector(qry).innerHTML += (`<br><h3>Habilidades:</h3><br>`)
                    
                    habilidades.forEach(element => {
                        document.querySelector(qry).innerHTML += (`<h2>Habilidade: ${captalizeLetter(element.ability.name)}</h2>`)
                    });


                    if (res.sprites.front_default != null && res.sprites.front_default != '') {
                        document.querySelector(qry).innerHTML += `<img src="${res.sprites.front_default}" alt="Imagem do ${res.name}">`
                    } else {
                        document.querySelector(qry).innerHTML += `<h2>Erro na Imagem</h2>`
                    }
                } )
        });
    })
    .catch( (error) => console.log(error))


    function captalizeLetter(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    }