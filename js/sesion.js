// bueno esta funcion la hice para que cuando el usuario le de al boton de entrar
// primero no se recargue la pagina y luego guarde lo que escribio
function iniciarSesion(evento) {
    evento.preventDefault(); // esto es para que el formulario no salga corriendo solo

    // aqui agarro el correo y la clave que la persona puso en los cuadritos
    const correoPuesto = document.getElementById('campo-correo').value;
    const clavePuesta = document.getElementById('campo-clave').value;

    // estos datos los guardo en el navegador para que no se pierdan al cambiar de pagina
    localStorage.setItem('usuarioActivo', correoPuesto);
    localStorage.setItem('claveActiva', clavePuesta);
    
    // si todo sale bien lo mando directo a la pagina de mis contactos
    window.location.href = "index/contactos.html";
}

// esta funcion es super importante porque revisa si el usuario de verdad entro
// si alguien intenta entrar a la fuerza sin loguearse esta funcion lo saca
function verificarEstado() {
    const usuario = localStorage.getItem('usuarioActivo');
    const clave = localStorage.getItem('claveActiva');
    const dondeEstoy = window.location.pathname;

    // si veo que no hay usuario guardado y no esta en el login lo mando de regreso al inicio
    if (!usuario && !dondeEstoy.includes("index.html")) {
        window.location.href = "../index.html";
    }
    
    // ahora si estoy en la pagina de perfil tengo que mostrar los datos que guarde
    // primero busco los ids que puse en el html
    const txtCorreo = document.getElementById('ver-correo');
    const txtClave = document.getElementById('ver-pass');
    
    // si esos ids existen pues les pongo el correo y la clave que ya tengo
    if (txtCorreo && usuario) txtCorreo.textContent = usuario;
    if (txtClave && clave) txtClave.textContent = clave;
}

// esto lo dejo aqui afuera para que se ejecute solito en cuanto cargue la pagina
verificarEstado();