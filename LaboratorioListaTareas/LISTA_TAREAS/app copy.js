
// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
const inputTarea = document.getElementById("ingresar-tarea");
const botonAgregar = document.getElementById("boton-agregar");
const listaTareas = document.getElementById("lista-tareas");

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
  const tareas = localStorage.getItem("tareas");
  return tareas ? JSON.parse(tareas) : [];
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

    const p = document.createElement("p");
    p.className = "texto-tarea";
    p.textContent = tarea.texto;
    if (tarea.completada) {
      p.style.textDecoration = "line-through"; 
    }

    const divBotones = document.createElement("div");
    divBotones.className = "botones-tarea";

    const btnOk = document.createElement("button");
    btnOk.className = "btn_ok";
    btnOk.innerHTML = "✔️";
    btnOk.onclick = () => completarTarea(index);

    const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn_eliminar";
    btnEliminar.innerHTML = "❌";
    btnEliminar.onclick = () => eliminarTarea(index);

    divBotones.appendChild(btnOk);
    divBotones.appendChild(btnEliminar);
    divTarea.appendChild(p);
    divTarea.appendChild(divBotones);

    listaTareas.appendChild(divTarea);
  });
}

// Marcar la Tarea como completada
function completarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas[index].completada = !tareas[index].completada;
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
  const tareas = obtenerTareasLocalStorage();
  tareas.splice(index, 1);
  guardarTareasLocalStorage(tareas);
  mostrarTareas();
}

// Crear una nueva Tarea
function nuevaTarea() {
  const texto = inputTarea.value.trim();
  if (texto === "") return;

  const tareas = obtenerTareasLocalStorage();
  tareas.push({ texto, completada: false });
  guardarTareasLocalStorage(tareas);
  inputTarea.value = "";
  mostrarTareas();
}
  
// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea
botonAgregar.addEventListener("click", nuevaTarea);

// Escuchar el inputTarea y en el evento keypress con la tecla Enter 
// llamar a nuevaTarea
inputTarea.addEventListener("keypress", (e) => {
  if (e.key === "Enter") nuevaTarea();
});

// Cargar tareas al iniciar con mostrarTareas
mostrarTareas();