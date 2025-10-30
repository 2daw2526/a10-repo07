class Shiny {
    constructor() {
        this.items = [];
    }
    static loadStorage() {
        //carga el carrito del localStorage
        this.items = JSON.parse(localStorage.getItem("shinycart")) || [];

        this.display();
    }
    static saveStorage() {
        //guarda en el local storage
        localStorage.setItem("shinycart", JSON.stringify(this.items));
    }
    static addPokemon(id, name, img) {
        if (!this.items) {
            this.items = []
        }
        let index = this.items.findIndex((item) => item.id == id);
        if (index == -1) {
            this.items.push({
                id: id,
                name: name,
                img: img,
            }
            );
        }
        this.saveStorage()
        this.display();
    }
    static display() {
        let shiny = document.getElementById('shinycart');
        shiny.innerHTML = "";
        let Shinynumber = document.getElementById('Shiny');
        Shinynumber.innerHTML = `Pokemon variocolor (${this.items.length})`;
        
        let isshiny = true
        for (let item of this.items) {
            shiny.innerHTML += `
            <figure class="figure">
            <figcaption class="figure-caption text-center text-uppercase">${item.name}</figcaption>
            <img src="${item.img}" onclick="Principal.AddCard(${item.id},${isshiny})" class="figure-img img-fluid rounded">
        </figure>`;
        }
    }
}