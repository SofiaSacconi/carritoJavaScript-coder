// --- VARIABLES GLOBALES ---
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const cantidadProductos = document.getElementById("cantidad");
const tabla = document.getElementById("tabla-carrito");
const totalCarritoTabla = document.getElementById("total-carrito");
const panelFlotante = document.getElementById("panel-flotante");
const contenedorProductos = document.getElementById("contenedor-productos");

// --- FUNCIONES GENERALES ---

//Mostrar cantidad de productos agregados al carrito
function actualizarResumenCarrito() {
    if (cantidadProductos) {
        cantidadProductos.textContent = carrito.length;
    }
}

// Guardar carrito actualizado en localStorage
function actualizarLocalStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Mostrar panel flotante al agregar productos
function mostrarPanelFlotante() {
    if (!panelFlotante) return;
    panelFlotante.classList.add("mostrar");
    setTimeout(() => panelFlotante.classList.remove("mostrar"), 2000);
}

//Vaciar carrito de compras
function vaciarCarrito() {
    carrito.length = 0;
    actualizarLocalStorage();
    actualizarResumenCarrito();
    if (tabla) tabla.innerHTML = "";
    if (totalCarritoTabla) totalCarritoTabla.textContent = "0.00";
}

// --- CARGA DE PRODUCTOS DESDE API ---

async function cargarProductosDesdeAPI() {
    try {
        const response = await fetch("https://68649d9f5b5d8d03397dab19.mockapi.io/carritoCoder/productos");
        const productos = await response.json();
        renderizarProductos(productos);
    } catch (error) {
        console.error("Error al cargar productos desde la API:", error);
    }
}


function renderizarProductos(productos) {
    if (!contenedorProductos) return;

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <p>${producto.nombre}</p>
            <p>$${parseFloat(producto.precio).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</p>
            <button class="comprar">Agregar al carrito</button>
        `;

        div.querySelector(".comprar").addEventListener("click", () => {
            carrito.push({
                nombre: producto.nombre,
                precio: parseFloat(producto.precio)
            });
            actualizarLocalStorage();
            actualizarResumenCarrito();
            mostrarPanelFlotante();
        });

        contenedorProductos.appendChild(div);
    });
}

// Representar contenido del carrito en una tabla
function renderizarCarrito(tabla, totalElemento) {
    if (!tabla || !totalElemento) return;
    tabla.innerHTML = "";
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

    totalElemento.textContent = total.toLocaleString("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

//Formulario de registro
const registroForm = document.getElementById("registroForm");
if (registroForm) {
    document.getElementById("usuario").value;
    document.getElementById("email").value;

    registroForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const usuarioData = { usuario, email, password };
        localStorage.setItem("usuarioData", JSON.stringify(usuarioData));

        Toastify({
            text: "Registro exitoso. Ahora puedes iniciar sesión.",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            style: { borderRadius: "10px" },
            stopOnFocus: true
        }).showToast();

        setTimeout(() => {
            window.location.href = "login.html";
        }, 3000);
    });
}

// Formulario de login
const login = document.getElementById("loginForm");
if (login) {
    login.addEventListener("submit", function (e) {
        e.preventDefault();

        const usuarioLogin = document.getElementById("usuarioLogin").value;
        const passwordLogin = document.getElementById("passwordLogin").value;
        const usuarioGuardado = JSON.parse(localStorage.getItem("usuarioData"));

        if (
            usuarioGuardado &&
            usuarioLogin === usuarioGuardado.usuario &&
            passwordLogin === usuarioGuardado.password
        ) {
            Toastify({
                text: "Inicio de sesión exitoso.",
                duration: 2500,
                gravity: "top",
                position: "center",
                backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
                style: { borderRadius: "10px" },
                stopOnFocus: true
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
                style: { borderRadius: "10px" },
                stopOnFocus: true
            }).showToast();
        }
    });
}

// Formulario de pago
const form = document.getElementById("formulario-pago");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        carrito.length = 0;
        actualizarLocalStorage();
        actualizarResumenCarrito();

        Toastify({
            text: "Compra exitosa (simulación)",
            duration: 3000,
            gravity: "top",
            position: "center",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
            style: { borderRadius: "10px" },
            stopOnFocus: true
        }).showToast();

        setTimeout(() => {
            window.location.href = "../index.html";
        }, 3000);
    });
}

// Boton para vaciar el carrito
const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
    btnVaciar.addEventListener("click", vaciarCarrito);
}

actualizarResumenCarrito();
cargarProductosDesdeAPI();
renderizarCarrito(tabla, totalCarritoTabla);
