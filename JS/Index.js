const lineasProductos = [ {
    nombre:'Juego de living',
    parrafo: 'La sala de estar que siempre soñaste',
    precio: 50000,
    descripcion:'El combo consta de un sillon esquinero de 2mt x 90cm x 160cm, mesa ratonera de 80cm x 60cm y 3 almohadones decorativos.',
    imgURL:"./Assets/IMG/Living.jpg",
    codigo: "Liv13",
    cantidad: 0,
},
{   nombre:'Dormitorio',
    parrafo: 'Descansa como se debe',
    precio: 75000,
    descripcion:'El juego de dormitorio trae un sommier de 1.40cm X 1.90cm (dos plazas) junto a su respaldo correspondiente y dos mesas de luz de melamina',
    imgURL:'./Assets/IMG/Colchon.jpg', 
    codigo: "Dorm7",
    cantidad: parseInt("0"),
},
{   nombre:'Comedor Escandinavo',
    parrafo: 'El comedor que siempre quisiste por poco dinero!',
    precio: 60000,
    descripcion:'Este set de comedor trae una mesa de vidrio con patas en madera paraiso de 1.60cm X 80cm junto a seis sillas tapizadas con patas en paraiso',
    imgURL:'./Assets/IMG/Comedor.jpg', 
    codigo: "Com20",
    cantidad: 0,
}
];

guardarProdLS(lineasProductos);

const chango = [];
const changuitoHTML = document.getElementById("chango");


const botonCliente = document.getElementById("BotonCliente");

Swal.fire({
    title: 'Bienvenido a #LaTienda Del Mueble',
    text: "Que accion quieres hacer?",
    icon: 'question',
    showCancelButton: false,
    confirmButtonColor: '#87adbd ',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Quiero Comprar'
    //cancelButtonText: "Soy empleado"
  }).then((result) => {
    if (result.isConfirmed) {
        let FondoBody = document.getElementById("Body");
        FondoBody.className = "fondoBodyCliente container-fluid row justify-content-center";
        let botonCarro = document.getElementById("BotonChango");
        botonCarro.className = "btn btn-secondary";
        const divCartas = document.getElementById("CartasProds");
        divCartas.className = "BienvenidaCartas text-center row justify-content-center align-items-center";
        divCartas.style = "border: black 5px solid";
        let cuandroPrincipal = document.getElementById("CuadroCentral");
        //cuandroPrincipal.className = "none";
        let lineas = recuperarProdLS();
        
        renderProds(lineas, divCartas)
    }
  })

/* botonCliente.onclick = () => { 
    let FondoBody = document.getElementById("Body");
    FondoBody.className = "fondoBodyCliente container-fluid row justify-content-center";
    let botonCarro = document.getElementById("BotonChango");
    botonCarro.className = "btn btn-secondary";
    const divCartas = document.getElementById("CartasProds");
    divCartas.className = "BienvenidaCartas text-center row justify-content-center align-items-center";
    divCartas.style = "border: black 5px solid";
    let cuandroPrincipal = document.getElementById("CuadroCentral");
    cuandroPrincipal.className = "none";
    let lineas = recuperarProdLS();
    
    renderProds(lineas, divCartas)
}; */

const renderProds = (lineas, target) => {
    
    let acumulador = '';
    lineas.map(producto => {
        acumulador += `
        <div class=" col-4 m-2" style="width: 18rem" ;>
            <div class="card-body m-4">
                <h5 class=" m-2 card-title">${producto.nombre}</h5>
                <h6 class="card-subtitle mb-3 text-muted">${producto.parrafo}</h6>
                <img src=${producto.imgURL} width="100" height="175" class="card-img-top" alt="${producto.nombre}">
                <p class="mt-2 card-text">${producto.descripcion} </br> Precio: $${producto.precio}.</p>
                <button ref=${producto.codigo} class="boton_venta BP btn btn-secondary my-2 col-md-3" id=${`botonCarta` + producto.nombre} > Agregar al carrito</button>
            </div>
        </div>   
        `
    })

    target.innerHTML = acumulador;

    const botonesCompra = document.querySelectorAll(".BP");
    botonesCompra.forEach(button => button.addEventListener("click", handleClick));    
}

const handleClick = (event) => {
    const codigo = event.target.getAttribute("ref");
    const product = lineasProductos.find(linea => linea.codigo === codigo);
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: "Agregaste un producto al carrito",
        showConfirmButton: false,
        timer: 1500
    })

    if (chango.some(el => el.codigo === product.codigo)) {
        const posicionArray = chango.findIndex(el => el.codigo === product.codigo)
        chango[posicionArray].cantidad = chango[posicionArray].cantidad + 1;
    } else {
        chango.push({
            codigo : product.codigo,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: 1,
            imgURL: product.imgURL,
        })
    }
    guardarCarroSS(chango);

    let changoSS = recuperarCarroSS();
    renderChango(changoSS, changuitoHTML);
}

const renderChango = (lineas, target) => {
    let acumulador = '';
    lineas.map(producto => {
        acumulador += `
        <div class=" col-4 m-2" style="width: 18rem" ;>
            <div class="card-body m-4">
                <h5 class=" m-2 card-title">${producto.nombre}</h5>
                <img src=${producto.imgURL} width="100" height="175" class="card-img-top" alt="${producto.nombre}">
                <p class="mt-2 card-text"> Cantidad selecionada: ${producto.cantidad} </br> Precio: $${producto.precio} </br> Precio Total: $${producto.precio * producto.cantidad}.</p>
                <div class="row justify-content-around">
                    <button ref=${producto.codigo} class="boton_venta BCA btn btn-secondary my-2 col-md-3" id="botonCarroAgregar" > Agregar uno </button>
                    <button ref=${producto.codigo} class="boton_venta BCQ btn btn-secondary my-2 col-md-3" id="botonCarroQuitar" > Quitar uno </button>
                </div>
            </div>
        </div>   
        `
    })

    target.innerHTML = acumulador;

    const botonAgregar = document.querySelectorAll(".BCA");
    const botonQuitar = document.querySelectorAll(".BCQ");

    


}

function guardarCarroSS(carro) {
    sessionStorage.setItem("CarritoDeCompras", JSON.stringify(carro));
}

function recuperarCarroSS() {
    return JSON.parse(sessionStorage.getItem("CarritoDeCompras")) || [];
}
function guardarProdLS(lineas) {
    localStorage.setItem("LineasDeProductos", JSON.stringify(lineas));
}

function recuperarProdLS() {
    return JSON.parse(localStorage.getItem("LineasDeProductos")) || [];
}
















