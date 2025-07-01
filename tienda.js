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


const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const usuarioData = {
            usuario,
            email,
            password
        };

        localStorage.setItem("usuarioData", JSON.stringify(usuarioData));

        Toastify({
            text: "Registro exitoso. Ahora puedes iniciar sesión.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            style:{
                borderRadius: "10px",
            },
            stopOnFocus: true
        }).showToast();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000); // espera a que se vea el toast
    });
}

const login = document.getElementById("loginForm");

if (login) {
    login.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuarioLogin = document.getElementById("usuarioLogin").value;
        const passwordLogin = document.getElementById("passwordLogin").value;

        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioData"));

        if (
            usuarioGuardado && usuarioLogin === usuarioGuardado.usuario && passwordLogin === usuarioGuardado.password
        ) {
            Toastify({
                text: "Inicio de sesión exitoso.",
                duration: 2500,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                style:{
                    borderRadius: "10px",
                },
                stopOnFocus: true,
            }).showToast();

            setTimeout(() => {
                window.location.href = "finalizar-compra.html";
            }, 1500);
        } else {
            Toastify({
                text: "Usuario o contraseña incorrectos.",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #f85032, #e73827)",
                style:{
                    borderRadius: "10px",
                },
                stopOnFocus: true
            }).showToast();
        }
    });
}

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

        total += producto.precio;
    });
    totalCarritoTabla.textContent = total.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

const form = document.getElementById("formularioCompra");
form.addEventListener("submit", function(e) {
    e.preventDefault();
    Toastify({
                text: "Compra exitosa (simulación)",
                duration: 3000,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                style:{
                    borderRadius: "10px",
                },
                stopOnFocus: true,
            }).showToast();
    setTimeout(() => {
                window.location.href = "index.html";
            }, 3000);
});
