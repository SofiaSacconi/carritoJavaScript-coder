let nombreUsuario = localStorage.getItem("nombreUsuario");
if (!nombreUsuario) {
    nombreUsuario = prompt("Hola, ¿Cuál es tu nombre?");
    if (nombreUsuario) {
        localStorage.setItem("nombreUsuario", nombreUsuario);
        alert(`¡Bienvenid@ ${nombreUsuario} a la tienda de Beauty!`);
    }
};

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cantidadProductos = document.getElementById("cantidad");
const totalElemento = document.getElementById("total");
const tabla = document.getElementById("tabla-carrito");
const totalCarritoTabla = document.getElementById("total-carrito");

function obtenerPrecio(boton) {
    const divProducto = boton.closest(".producto");
    const nombre = divProducto.querySelectorAll("p")[0].textContent;
    const textoPrecio = divProducto.querySelectorAll("p")[1].textContent;
    const precio = parseFloat(
        textoPrecio.replace("$", "").replace(/\./g, "").replace(",", ".")
    );
    return { nombre, precio: isNaN(precio) ? 0 : precio };
}

function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarPanelFlotante() {
    const panel = document.getElementById("panel-flotante");
    if (!panel) return;
    panel.classList.add("mostrar");
    setTimeout(() => panel.classList.remove("mostrar"), 2000);
}

function actualizarResumenCarrito() {
    if (!cantidadProductos) return;
    cantidadProductos.textContent = carrito.length;
}

function vaciarCarrito() {
    carrito.length = 0;
    actualizarLocalStorage();
    actualizarResumenCarrito();
    if (tabla) tabla.innerHTML = "";
    if (totalCarritoTabla) totalCarritoTabla.textContent = "0.00";
}

const botones = document.querySelectorAll(".comprar");
if (botones.length > 0) {
    botones.forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = obtenerPrecio(boton);
            carrito.push(producto);
            actualizarLocalStorage();
            actualizarResumenCarrito();
            mostrarPanelFlotante();
        });
    });
}


const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
}

actualizarResumenCarrito();

if (tabla && totalCarritoTabla) {
    let total = 0;
    carrito.forEach(producto => {
        const fila = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = producto.nombre;

        const tdPrecio = document.createElement("td");
        tdPrecio.textContent = producto.precio.toLocaleString("es-AR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        fila.appendChild(tdNombre);
        fila.appendChild(tdPrecio);
        tabla.appendChild(fila);

        total += producto.price || producto.precio;
    });
    totalCarritoTabla.textContent = total.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

