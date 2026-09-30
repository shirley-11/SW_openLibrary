import {database} from './database.js'



window.onload = inicializar
let indice = 0
let titulo, autor, isbn, año, imagen



function inicializar () {
     titulo = document.getElementById("titulo")
     autor = document.getElementById("autor")
     año = document.getElementById("año")
     isbn = document.getElementById("isbn")
     imagen = document.getElementById("potada")

    

    let atas = document.getElementById("atas")
    let siguiente = document.getElementById("siguiente")

    atas.addEventListener("click", iAtas)
    siguiente.addEventListener("click", iSiguiente)
    busca.addEventListener("click", buscaLibo)
    cagaDatos()

}

function iAtas() {
    if (indice > 0) {
        indice--
        cagaDatos()
    }
    
}

function iSiguiente ( ) {
    if (indice < database.length -1 ) {
        indice++
        cagaDatos()
    }
    
}

function buscaLibo (){
    

    fetch("https://openlibrary.org/search.json?q=isbn:" + isbn.value)
    .then(r => r.json())
    .then(libroJSON =>{ console.log(libroJSON)
        let libro = mapearLibro(libroJSON)
        database.push(libro)
        indice = database.length -1


    })
    
    cagaDatos()

}

function mapearLibro (json) {
    let datos = json.docs[0]
    let autores = datos.author_name || []
    //let equis = 10

    let libro = {
        isbn: json.q.split(":")[1],
        autor: autores.join(" ,"),
        fecha: datos.first_publish_year,
        titulo: datos.title,
        filename: datos.cover_i + "-M.jpg"
    }
    return libro
        
}


function cagaDatos () {
    titulo.value = database[indice].titulo
    autor.value = database[indice].autor
    isbn.value = database[indice].isbn
    año.value = database[indice].fecha
    imagen.src = "https://covers.openlibrary.org/b/id/" + database[indice].filename
}


