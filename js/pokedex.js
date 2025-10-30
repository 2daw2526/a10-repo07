class Carta {
    constructor() {

    }
    static async pokeAPI(url) {
        const response = await fetch(url);
        if (!response.ok) {
            // BAD
            console.error('ERROR fetching data');
            return null
        } else {
            // GOOD
            return await response.json();
        }
    }
    static randomnumber() {
        return (Math.floor(Math.random() * 1024) + 1);
    }
}

class Principal {
    constructor() {
    }
    static background() {
        document.body.style.backgroundImage = "";
        let fecha = new Date();
        const horas = fecha.getHours().toString().padStart();
        if (horas >= 6 && horas <= 14) {
            document.body.style.backgroundImage = "url('../imágenes/day.webp')";
            //Imagen de mañana
        } else if (horas > 14 && horas <= 22) {
            //Imagen tarde
            document.body.style.backgroundImage = "url('../imágenes/tarde.jpg')"
        } else if (horas > 22 && horas <= 24 || horas < 6) {
             //Imagen noche
             document.body.style.backgroundImage = "url('../imágenes/nigth.png')"
        } else{
        }
        let start = document.getElementById("start");
        start.classList.add("display_none");
        let poke = document.getElementById("pokeapi");
        poke.classList.remove("display_none");    
    }

    static async AddCard(id = Carta.randomnumber(), isshiny = false) {
        //desactivar boton
        document.querySelector(".addcard").disabled = true
        document.querySelector(".addcard").innerHTML = "Espere un momento"
        let deck = document.querySelector(".deck");
        let ispage = false;
        deck.innerHTML += `
<div data-shiny="false" class="card m-2 shadow d-inline-block border align-top border-black" style="width: 24rem;">
                <h5 class="card-title numero"></h5>
                <img class="pokeimg card-img-top" src="#">
                    <p class="card-header pokenombre"></p>
                    <div class="card-body">
                        <button href="#" class=" btn btn-info card-link" 
                        onclick="Principal.fillcard(this.closest('.card'),Carta.randomnumber())">Recarga</button>

                        <button href="#" class=" btn btn-danger card-link" 
                        onclick="Principal.remove(this.closest('.card'))";>Borrar</button>

                    <button href="#" class="alterbutton btn btn-secondary card-link" 
                    data-id="0"
                    data-isshiny=""
                     onclick="Principal.remove(this.closest('.card')),Principal.AddPage(this.dataset.id,this.dataset.isshiny)";>Extender</button>
                <button href="#" class="favbutton btn btn-warning card-link
                data-id="0"
                data-name="Missigno"
                data_img="Missigno.png"
         onclick="Favorito.addPokemon(this.dataset)";>fav</button>
    </div >
    </div >
        `
        //ahora hay que rellenar la carta
        let cards = document.querySelectorAll(".card");
        await Principal.fillcard(cards[cards.length - 1], id, ispage, isshiny)
        //reactivar el boton
        document.querySelector(".addcard").disabled = false
        document.querySelector(".addcard").innerHTML = "Añadir pokemon"
    }

    static async AddPage(id = Carta.randomnumber(), isshiny = false) {
        //desactivar boton
        document.querySelector(".addcard").disabled = true
        document.querySelector(".addcard").innerHTML = "Espere un momento"
        let deck = document.querySelector(".deck");
        let ispage = true;

        deck.innerHTML += `
         <div class="card container border border-black">
        <div class="row">
            <div class="col-12 p-1">
                <div class="">
                    <h5 class="card-title numero"></h5>
                </div>
            </div>
            <div class="col-sm-3 col-xs-12 p-1">
                <div class="h-100">
                    <img class="pokeimg card-img-top" src="#">
                </div>
            </div>
            <div class="col-sm-9 col-12">
                <div class="row m-1">
                    <div class="col-12">
                        <p class="card-header pokenombre"></p>
                        <p class="card-header pokemon_nombre"></p>
                        <p class="card-header type"></p>
                    </div>
                    <div class="col-12 col-md-12">
                        <p class="card-text descripcion border-bottom border-black ">
                        <p>Habilidades:</p>
                        <div class="accordion abilities" id="accordionExample">
                        </div>
                        </p>
                    </div>
                </div>
                
            </div>
            <div class="col-12 p-1">
                <div class="col-12 stats">Gráfica y estadísticas</div>
            <div class="col-12 col-md">
                        <div class="border-bottom border-black evolution"></div></div>
            <div class="col-12 col-md">
                        <div class="forms"></div>
                        <div class="varieties"></div>
                    </div>
                <div class="">
                    <div class="card-body">
                        <button href="#" class=" btn btn-info card-link"
                            onclick="Principal.fillcard(this.closest('.card'),Carta.randomnumber(),true)">Recargar</button>
                        <button href="#" class=" btn btn-danger card-link"
                            onclick="Principal.remove(this.closest('.card'))" ;>Eliminar</button>
                         <button href="#" class="alterbutton btn btn-secondary card-link"
                         data-id="0"
                         data-isshiny=""
                     onclick="Principal.remove(this.closest('.card')),Principal.AddCard(this.dataset.id,this.dataset.isshiny)";>Contraer</button>

                        <button href="#" class="favbutton btn btn-warning card-link
                data-id="0"
                data-name="Missigno"
                data_img="Missigno.png"
         onclick="Favorito.addPokemon(this.dataset)";>fav</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        //ahora hay que rellenar la carta
        let cards = document.querySelectorAll(".card");
        await Principal.fillcard(cards[cards.length - 1], id, ispage, isshiny)

        //reactivar el boton
        document.querySelector(".addcard").disabled = false
        document.querySelector(".addcard").innerHTML = "Añadir pokemon"
    }

    static remove(card) {
        card.remove();
    }

    static async fillcard(card, id, ispage, isshiny = false) {
        const url = "https://pokeapi.co/api/v2/pokemon/" + id;
        let pokemondata = await Carta.pokeAPI(url);
        let species = await Carta.pokeAPI(pokemondata.species.url);
        //console.log(species);
        let buttonCart = card.querySelector('.favbutton');

        // let crie = Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/${id}.MP3`);
        // crie.play();

        buttonCart.dataset.id = id;
        buttonCart.dataset.name = pokemondata.name;
        buttonCart.dataset.img = pokemondata.sprites.front_default;

        let alterbutton = card.querySelector('.alterbutton');
        alterbutton.dataset.id = id;
        alterbutton.dataset.isshiny = isshiny;

        let poke_species;
        let poke_data;
        let pokeimg;

        if (pokemondata != null) {
            //Imagen
            if (pokemondata.id <= 1025) {
                card.querySelector('.numero').innerHTML = "N* " + pokemondata.id;
            }
            // HTML
            let img = card.querySelector('.pokeimg');
            //Una pequeña probailidad de que el pokemon sea shiny
            //La probabilidad es de 1/10240 0.0009765625
            if (0.0078125 >= Math.random() || isshiny == true) {
                img.src = pokemondata.sprites.front_shiny;
                Shiny.addPokemon(id, pokemondata.name, pokemondata.sprites.front_shiny);
            } else {
                img.src = pokemondata.sprites.front_default;
            }
            card.querySelector('.pokenombre').innerHTML = pokemondata.name;

            if (ispage) { //Tengo una carta con solo N, imagen y nombre, si extiendes la página borra la carta y pone la versión extendida, la cual cumple con esto
                card.querySelector('.evolution').innerHTML = "";
                card.querySelector('.varieties').innerHTML = "";
                card.querySelector('.forms').innerHTML = "";
                card.querySelector('.abilities').innerHTML = "";
                card.querySelector('.type').innerHTML = "";
                card.querySelector('.stats').innerHTML = "";

                let texts = species.flavor_text_entries; // Array de descripciones (las hay en muchos idiomas)
                let filtrados = texts.filter((text) => text.language.name == 'es'); // se queda con las que tengan el código de idioma que queremos

                // Descripción
                if (filtrados.length > 0) {
                    card.querySelector('.descripcion').innerHTML = filtrados[0].flavor_text; // mete el primero en el HTML
                } else {
                    // si no hay traducción en el idioma deseado mete el primero que haya
                    card.querySelector('.descripcion').innerHTML = texts[0].flavor_text;
                }

                let i = 0
                for (let ab of pokemondata.abilities) {
                    let description = await Carta.pokeAPI(ab.ability.url);
                    card.querySelector('.abilities').innerHTML += Principal.ability(description, i);
                    i++
                }

                for (let i = 0; i < pokemondata.stats.length; i++) {
                    card.querySelector('.stats').innerHTML += Principal.stats(pokemondata, i);
                }
                for (let i = 0; i < pokemondata.types.length; i++) {
                    card.querySelector('.type').innerHTML += Principal.type(pokemondata, i);
                }
                //Alias 
                let nickname = species.genera;
                for (let i = 0; i < nickname.length; i++) {
                    if (nickname[i].language.name == "es") {
                        let nickfilt = nickname[i].genus;
                        card.querySelector('.pokemon_nombre').innerHTML = nickfilt;
                        break;
                    } else if (nickname[i].language.name == "en") {
                        let nickfilt = nickname[i].genus;
                        card.querySelector('.pokemon_nombre').innerHTML = nickfilt;
                        break;
                    } else {
                        let nickfilt = nickname[0].genus
                        card.querySelector('.pokemon_nombre').innerHTML = nickfilt;
                    }
                }



                let evolution = await Carta.pokeAPI(species.evolution_chain.url);
                poke_species = await Carta.pokeAPI(evolution.chain.species.url);
                const url_evo_0 = "https://pokeapi.co/api/v2/pokemon/" + poke_species.id;
                poke_data = await Carta.pokeAPI(url_evo_0);


                if (img.src == pokemondata.sprites.front_shiny) {
                    pokeimg = poke_data.sprites.front_shiny;
                } else {
                    pokeimg = poke_data.sprites.front_default;
                }

                card.querySelector('.evolution').innerHTML += Principal.figure(pokeimg, poke_data, poke_species, ispage);

                //Si el pokemon puede evolucionar  a varios, esto me dice todos sus nombres,como las evos de eevee
                for (let i = 0; i < evolution.chain.evolves_to.length; i++) {

                    poke_species = await Carta.pokeAPI(evolution.chain.evolves_to[i].species.url)
                    const url_evo_1 = "https://pokeapi.co/api/v2/pokemon/" + poke_species.id;
                    poke_data = await Carta.pokeAPI(url_evo_1);

                    if (img.src == pokemondata.sprites.front_shiny) {
                        pokeimg = poke_data.sprites.front_shiny;
                    } else {
                        pokeimg = poke_data.sprites.front_default;
                    }

                    card.querySelector('.evolution').innerHTML += Principal.figure(pokeimg, poke_data, poke_species, ispage);

                    for (let j = 0; j < evolution.chain.evolves_to[i].evolves_to.length; j++) {
                        poke_species = await Carta.pokeAPI(evolution.chain.evolves_to[i].evolves_to[j].species.url)
                        const url_evo_2 = "https://pokeapi.co/api/v2/pokemon/" + poke_species.id;
                        poke_data = await Carta.pokeAPI(url_evo_2);
                        // console.log(poke_data)
                        if (img.src == pokemondata.sprites.front_shiny) {
                            pokeimg = poke_data.sprites.front_shiny;
                        } else {
                            pokeimg = poke_data.sprites.front_default;
                        }
                        card.querySelector('.evolution').innerHTML += Principal.figure(pokeimg, poke_data, poke_species, ispage);
                    }
                }


                //Imagen formas
                if (pokemondata.forms.length > 0) {
                    for (let i = 1; i < pokemondata.forms.length; i++) {
                        let form = await Carta.pokeAPI(pokemondata.forms[i].url);
                        if (img.src == pokemondata.sprites.front_shiny) {
                            pokeimg = form.sprites.front_shiny;
                        } else {
                            pokeimg = form.sprites.front_default;
                        }
                        if (pokeimg != null && form != null) {
                            card.querySelector('.forms').innerHTML += Principal.figure(pokeimg, form, form, ispage);
                        }
                    }
                }
                //Imagen variaciones
                if (species.varieties.length > 0) {
                    for (let i = 1; i < species.varieties.length; i++) {
                        let varieties = await Carta.pokeAPI(species.varieties[i].pokemon.url);
                        if (img.src == pokemondata.sprites.front_shiny) {
                            pokeimg = varieties.sprites.front_shiny;
                        } else {
                            pokeimg = varieties.sprites.front_default;
                        }
                        if (pokeimg != null && varieties != null) {
                            card.querySelector('.varieties').innerHTML += Principal.figure(pokeimg, varieties, varieties, ispage);
                        }
                    }
                }

            }
        } else {
            alert("ERROR");
        }
        isshiny = false;
    }
    static ability(description, x) {
        let name = description.names;
        let filtername;

        for (let i = 0; i < name.length; i++) {
            if (name[i].language.name == "es") {
                filtername = name[i].name;
                break;
            } else if (name[i].language.name == "en") {
                filtername = name[i].name;
                break;
            } else {
                filtername = name[0].name;
            }
        }

        let descripcion = description.flavor_text_entries;
        let index = null;
        let filterdescripcion;
        index = descripcion.findIndex((descripcion) => descripcion.language.name == "es");
        if (index != null) {
            filterdescripcion = descripcion[index].flavor_text
        } else if (index != null) {
            index = descripcion.findIndex((descripcion) => descripcion.language.name == "en");
            filterdescripcion = descripcion[index].flavor_text
        } else {
            filterdescripcion = descripcion[0].flavor_text
        }


        if (index != null) {
            return `
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${x}" aria-expanded="true" aria-controls="collapse${x}">
                      ${filtername}
                    </button>
                  </h2>
                  <div id="collapse${x}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    ${filterdescripcion}
                    </div>
                  </div>
                </div>
        `
        }
    }
    static figure(pokeimg, poke_data, poke_species, ispage) {
        return `
        <figure class="figure">
            <figcaption class="figure-caption text-center text-uppercase">${poke_data.name}</figcaption>
            <img src="${pokeimg}" onclick="Principal.fillcard(this.closest('.card'),${poke_species.id},${ispage})" class="figure-img img-fluid rounded">
        </figure>
        `
    }
    static stats(pokemondata, i) {
        if (pokemondata.stats[i].stat.name == "hp" && pokemondata.name.includes("gmax")) {
            return `
            <p>${pokemondata.stats[i].stat.name} * (Los pokemon dinamax tienen el doble de salud)</p>
            <div class="progress" role="progressbar" aria-label="Example with label"  aria-valuenow="" aria-valuemin="0" aria-valuemax="255" style="height: 20px">
                <div class="progress-bar text-bg-light" style="width:${pokemondata.stats[i].base_stat / 255 * 200}%">${pokemondata.stats[i].base_stat * 2}</div>
            </div>
             </div>
            `
        }
        if (pokemondata.stats[i].base_stat >= 90) {
            return `
        <p>${pokemondata.stats[i].stat.name}</p>
        <div class="progress" role="progressbar" aria-label="Example with label"  aria-valuenow="" aria-valuemin="0" aria-valuemax="255" style="height: 20px">
            <div class="progress-bar bg-success" style="width:${pokemondata.stats[i].base_stat / 255 * 100}%">${pokemondata.stats[i].base_stat}</div>
        </div>
         </div>
        `
        } else if (pokemondata.stats[i].base_stat < 90 && pokemondata.stats[i].base_stat >= 50) {
            return `
        <p>${pokemondata.stats[i].stat.name}</p>
        <div class="progress" role="progressbar" aria-label="Example with label"  aria-valuenow="" aria-valuemin="0" aria-valuemax="255" style="height: 20px">
            <div class="progress-bar bg-warning" style="width:${pokemondata.stats[i].base_stat / 255 * 100}%">${pokemondata.stats[i].base_stat}</div>
        </div>
         </div>
        `
        } else {
            return `
        <p>${pokemondata.stats[i].stat.name}</p>
        <div class="progress" role="progressbar" aria-label="Example with label"  aria-valuenow="" aria-valuemin="0" aria-valuemax="255" style="height: 20px">
            <div class="progress-bar bg-danger" style="width:${pokemondata.stats[i].base_stat / 255 * 100}%">${pokemondata.stats[i].base_stat}</div>
        </div>
         </div>
        `
        }
    }
    static type(pokemondata, i) {
        let typename = pokemondata.types[i].type.name
        if (typename == "steel") {
            return `
            <img src="../tipos/Tipo_acero_XY.png" alt="">
        `
        } else if (typename == "water") {
            return `
            <img src="../tipos/Tipo_agua_XY.png" alt="">
        `
        } else if (typename == "bug") {
            return `
            <img src="../tipos/Tipo_bicho_XY.png" alt="">
        `
        } else if (typename == "dragon") {
            return `
            <img src="../tipos/Tipo_dragón_XY.png" alt="">
        `
        } else if (typename == "electric") {
            return `
            <img src="../tipos/Tipo_eléctrico_XY.png" alt="">
        `
        } else if (typename == "ghost") {
            return `
            <img src="../tipos/Tipo_fantasma_XY.png" alt="">
        `
        } else if (typename == "fire") {
            return `
            <img src="../tipos/Tipo_fuego_XY.png" alt="">
        `
        } else if (typename == "fairy") {
            return `
            <img src="../tipos/Tipo_hada_XY.png" alt="">
        `
        } else if (typename == "ice") {
            return `
            <img src="../tipos/Tipo_hielo_XY.png" alt="">
        `
        } else if (typename == "fighting") {
            return `
            <img src="../tipos/Tipo_lucha_XY.png" alt="">
        `
        } else if (typename == "normal") {
            return `
            <img src="../tipos/Tipo_normal_XY.png" alt="">
        `
        } else if (typename == "grass") {
            return `
            <img src="../tipos/Tipo_planta_XY.png" alt="">
        `
        } else if (typename == "psychic") {
            return `
            <img src="../tipos/Tipo_psíquico_XY.png" alt="">
        `
        } else if (typename == "rock") {
            return `
            <img src="../tipos/Tipo_roca_XY.png" alt="">
        `
        } else if (typename == "dark") {
            return `
            <img src="../tipos/Tipo_siniestro_XY.png" alt="">
        `
        } else if (typename == "ground") {
            return `
            <img src="../tipos/Tipo_tierra_XY.png" alt="">
        `
        } else if (typename == "poison") {
            return `
            <img src="../tipos/Tipo_veneno_XY.png" alt="">
        `
        } else if (typename == "flying") {
            return `
            <img src="../tipos/Tipo_volador_XY.png" alt="">
        `
        } else {
            return `
            <img src="../tipos/90px-Tipo_astral_EP.png" alt="">
        `
        }
    }
}
