// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas

const inputTarea = document.getElementById("ingresar-tarea");
const botonAgregar = document.getElementById("boton-agregar");
const listaTareas = document.getElementById("lista-tareas");

// Obtener tareas del localStorage

function obtenerTareasLocalStorage() {
    const tareasGuardadas = localStorage.getItem("tareas");

    if (tareasGuardadas) {
        return JSON.parse(tareasGuardadas);
    } else {
        return [];
    }
}

// Guardar tareas en localStorage

function guardarTareasLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Renderizar la lista de tareas en el DOM

function mostrarTareas() {
    listaTareas.innerHTML = "";
    const tareas = obtenerTareasLocalStorage();

    tareas.forEach((tarea, index) => {
        const divTarea = document.createElement("div");
        divTarea.className = "tarea";

        const pTexto = document.createElement("p");
        pTexto.className = "texto-tarea";
        pTexto.textContent = tarea.texto;
        if (tarea.completada) {
            pTexto.style.textDecoration = "line-through";
        }

        const divBotones = document.createElement("div");
        divBotones.className = "botones-tarea";

        const botonOk = document.createElement("button");
        botonOk.className = "btn_ok";
        botonOk.textContent = "✔️";
        botonOk.onclick = () => completarTarea(index);

        const botonEliminar = document.createElement("button");

        botonEliminar.className = "btn_eliminar";
        botonEliminar.textContent = "❌";
        botonEliminar.onclick = () => eliminarTarea(index);

        divBotones.appendChild(botonOk);
        divBotones.appendChild(botonEliminar);

        divTarea.appendChild(pTexto);

        divTarea.appendChild(divBotones);

        listaTareas.appendChild(divTarea);
    });
}

// Marcar la tarea como completada
function completarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas[index].completada = !tareas[index].completada;
    guardarTareasLocalStorage(tareas);
    mostrarTareas();
}

// Eliminar la tarea correspondiente

function eliminarTarea(index) {
    const tareas = obtenerTareasLocalStorage();
    tareas.splice(index, 1);
    guardarTareasLocalStorage(tareas);
    mostrarTareas();
}

// Crear una nueva tarea

function nuevaTarea() {
    const texto = inputTarea.value.trim();
    if (texto === "") {
        alert("Escribe una tarea primero");
        return;
    }

    const tareas = obtenerTareasLocalStorage();
    tareas.push({ texto: texto, completada: false });
    guardarTareasLocalStorage(tareas);

    inputTarea.value = "";
    mostrarTareas();
}

// Escuchar el botón Agregar y en el evento click llamar a nuevaTarea

botonAgregar.addEventListener("click", nuevaTarea);

// Escuchar el inputTarea y en el evento keypress con la tecla Enter 
// llamar a nuevaTarea

inputTarea.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        nuevaTarea();
    }
});

// Cargar tareas al iniciar con mostrarTareas
mostrarTareas();