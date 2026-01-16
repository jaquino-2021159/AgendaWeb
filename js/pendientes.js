// aqui cree una lista vacia para ir guardando todas las tareas que voy anotando
let arregloTareas = [];

// esta funcion se encarga de sacar la info del cuadro de texto y meterla a la lista
function añadirTarea() {
    const elTexto = document.getElementById('texto-tarea');
    const laPrioridad = document.getElementById('nivel-tarea');

    // si el usuario no escribio nada le tiro una alerta para que no me mande tareas vacias
    if (elTexto.value.trim() === "") return alert("¡Ey! Escribe algo por favor");

    // aqui armo un paquetito con el nombre de la tarea y que tan urgente es
    const nuevaCosa = {
        id: Date.now(), // le pongo un id unico usando la hora exacta
        nombre: elTexto.value,
        nivel: laPrioridad.value
    };

    // meto la tarea al arreglo limpio el cuadrito y mando a dibujar la lista en el html
    arregloTareas.push(nuevaCosa);
    elTexto.value = "";
    dibujarEnPantalla();
}

// esta funcion es la que hace que las tareas aparezcan visualmente en la pagina
function dibujarEnPantalla() {
    const listaHtml = document.getElementById('lista-tareas');
    if (!listaHtml) return;
    listaHtml.innerHTML = ""; // primero borro todo para que no se repitan las tareas

    // las ordeno para que las que son urgentes me salgan hasta arriba
    arregloTareas.sort((a, b) => a.nivel - b.nivel);

    // empiezo a crear los elementos de la lista uno por uno
    arregloTareas.forEach(t => {
        const li = document.createElement('li');

        // dependiendo de la prioridad le pongo una clase u otra para que cambie el color
        if (t.nivel == "1") li.className = "urgente";
        else if (t.nivel == "2") li.className = "normal";
        else li.className = "tranquilo";

        // aqui armo lo que va adentro del renglon el nombre y los botones de editar y borrar
        li.innerHTML = `
            <span>${t.nombre}</span>
            <div>
                <button class="boton-amarillo" onclick="editarTarea(${t.id})">Editar</button>
                <button class="boton-rojo" onclick="borrarTarea(${t.id})">X</button>
            </div>
        `;
        listaHtml.appendChild(li); // lo meto a la lista que esta en el html
    });
}

// funcion sencillita para quitar una tarea de la lista si ya no la quiero
function borrarTarea(idBorrar) {
    arregloTareas = arregloTareas.filter(item => item.id !== idBorrar);
    dibujarEnPantalla(); // vuelvo a dibujar para que ya no aparezca
}

// esta es la funcion para cambiarle cosas a una tarea que ya anote
function editarTarea(idEditar) {
    // primero busco en mi lista cual es la tarea que quiero cambiar usando su id
    const tarea = arregloTareas.find(item => item.id === idEditar);

    // le pregunto al usuario el nuevo nombre si no escribe nada dejo el que ya tenia
    const nuevoNombre = prompt("¿Cómo quieres que se llame ahora?", tarea.nombre);

    // aqui le pido que elija el color o la importancia con numeros para que sea facil
    const nuevoNivel = prompt(
        "¿En que estado lo quieres poner?\n1. Urgente \n2. Mas o menos \n3. Tranquilo ",
        tarea.nivel
    );

    // si el usuario escribio un nombre nuevo y le dio a aceptar lo guardo
    if (nuevoNombre !== null) {
        tarea.nombre = nuevoNombre;
    }

    // si puso 1 2 o 3 le cambio el color a la tarea de una vez
    if (nuevoNivel === "1" || nuevoNivel === "2" || nuevoNivel === "3") {
        tarea.nivel = nuevoNivel;
    }

    // al final vuelvo a dibujar la lista para que se vean los cambios de nombre y color
    dibujarEnPantalla();
}