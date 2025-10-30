class Favorito {
    constructor() {
        this.items = [];
    }
    static loadStorage() {
        //carga el carrito del localStorage
        this.items = JSON.parse(localStorage.getItem("pokecart")) || [];

        this.display();
    }
    static saveStorage() {
        //guarda en el local storage
        localStorage.setItem("pokecart", JSON.stringify(this.items));
    }
    static addPokemon(data) {
        if (!this.items) {
            this.items = []
        }
        let index = this.items.findIndex((item) => item.id == data.id);
        if (index == -1) {
            this.items.push({
                id: data.id,
                name: data.name,
                img: data.img,
            }
            );
        } else {
            this.remove(data.id)
        }

        this.saveStorage();
        this.display();
        //console.log(this.items);
        //Buscamos el id en el array items
        //Si existe, lo borro y viceversa
    }
    static removeall() {
        //borra todos los favoritos
        this.items.splice(0);

        this.saveStorage();
        this.display();

    }
    static remove(id) {
        //localiza la posición del elemento en el array
        let index = this.items.findIndex((item) => item.id == id);
        // borra esa posición
        this.items.splice(index, 1);
        this.display();
        this.saveStorage();


    }
    static display() {
        let favorite = document.getElementById('pokecart');
        let etiqueta = document.getElementById('etiqueta');
        etiqueta.innerHTML = `Pokemon favoritos (${this.items.length})`;
        favorite.innerHTML = "";


        for (let item of this.items) {
            favorite.innerHTML += `
            <figure class="figure">
            <figcaption class="figure-caption text-center text-uppercase">${item.name}</figcaption>
            <img src="${item.img}" onclick="Principal.AddCard(${item.id})" class="bg-light figure-img img-fluid rounded">
            <button href="#" class=" btn btn-danger "onclick="Favorito.remove(${item.id})" ;>X</button>
        </figure>`;
        }

    }
}
