const listaDelIndice = document.querySelector('#lista-del-indice');
const titulos = document.querySelectorAll('main h2');

titulos.forEach(function (titulo) {
    const elementoDeLaLista = document.createElement('li');
    const enlace = document.createElement('a');

    enlace.textContent = titulo.textContent;
    enlace.href = `#${titulo.id}`;

    elementoDeLaLista.append(enlace);
    listaDelIndice.append(elementoDeLaLista);
});



const BotonDelTema = document.querySelector('#boton-de-tema');

BotonDelTema.addEventListener('click', function () {

    document.body.classList.toggle('fondo-oscuro');

    const contenedor = document.querySelector('.contenedor-wiki');
    contenedor.classList.toggle('contenedor-oscuro');

    const paneles = document.querySelectorAll('aside, main, .imagen-contextual, .panel-de-busqueda');

    paneles.forEach(function (panel) {
        panel.classList.toggle('panel-oscuro');
    });

    const subtitulos = document.querySelectorAll('aside h2, aside h3, .panel-de-busqueda h3, main h2, main h3, main .texto-imagen, #contador-caracteres');

    subtitulos.forEach(function (subtitulo) {
        subtitulo.classList.toggle('texto-oscuro');
    });

    const enlaces = document.querySelectorAll('aside a, main a');

    enlaces.forEach(function (enlace) {
        enlace.classList.toggle('enlace-oscuro');
    });

    const campos = document.querySelectorAll('input, textarea');
    

    campos.forEach(function (campo) {
        campo.classList.toggle('campo-oscuro');
    });
    const parrafosEncontrados = document.querySelectorAll('.parrafo-encontrado');

parrafosEncontrados.forEach(function (parrafo) {
    parrafo.classList.toggle('parrafo-encontrado-oscuro');
});

    const tituloBusqueda = document.querySelector('.titulo-busqueda');
    tituloBusqueda.classList.toggle('titulo-busqueda-oscuro');


   const contador = document.querySelector('.contador-caracteres');

if (document.body.classList.contains('fondo-oscuro')) {
    if (contador.classList.contains('contador-error')) {
        contador.classList.add('contador-error-oscuro');
    }
} else {
    contador.classList.remove('contador-error-oscuro');
}

    const botones = document.querySelectorAll('button');

    botones.forEach(function (boton) {
        boton.classList.toggle('boton-oscuro');
    });

    const botonEnviar = document.querySelector('.boton-enviar-comentario');
    botonEnviar.classList.toggle('boton-enviar-oscuro');

    const footer = document.querySelector('footer');
footer.classList.toggle('borde-footer-oscuro');

if (document.body.classList.contains('fondo-oscuro')) {
    BotonDelTema.textContent = 'Modo claro';
} else {
    BotonDelTema.textContent = 'Modo oscuro';
}
});


const botonTextoPequeño = document.querySelector('#Texto-Pequeño');
const botonTextoNormal = document.querySelector('#Texto-Normal');
const botonTextoGrande = document.querySelector('#Texto-Grande');

const articulo = document.querySelector('main');
const botonesTexto = document.querySelectorAll('.opciones-del-texto button');


function cambiarTamañoTexto(tamaño, botonSeleccionado) {

    articulo.classList.remove('texto-pequeño');
    articulo.classList.remove('texto-estandar');
    articulo.classList.remove('texto-grande');

    articulo.classList.add(tamaño);

    botonesTexto.forEach(function (boton) {
        boton.classList.remove('boton-seleccionado');
    });

    botonSeleccionado.classList.add('boton-seleccionado');
}


botonTextoPequeño.addEventListener('click', function () {
    cambiarTamañoTexto('texto-pequeño', botonTextoPequeño);
});

botonTextoNormal.addEventListener('click', function () {
    cambiarTamañoTexto('texto-estandar', botonTextoNormal);
});

botonTextoGrande.addEventListener('click', function () {
    cambiarTamañoTexto('texto-grande', botonTextoGrande);
});


cambiarTamañoTexto('texto-estandar', botonTextoNormal);



const secciones = document.querySelectorAll('main section');

secciones.forEach(function (seccion) {

    const titulo = seccion.querySelector('h2');
    const parrafos = seccion.querySelectorAll('p');
    const listas = seccion.querySelectorAll('ul');
    const subtitulos = seccion.querySelectorAll('h3');
    const imagenes = seccion.querySelectorAll('.imagen-contextual');
    const formularios = seccion.querySelectorAll('form');

    if (titulo) {

        const flecha = document.createElement('span');
        flecha.textContent = ' ▾';
        titulo.append(flecha);

        titulo.addEventListener('click', function () {

            seccion.classList.toggle('plegada');

            if (seccion.classList.contains('plegada')) {
                flecha.textContent = ' ▸';
                parrafos.forEach(function (parrafo) {
                    parrafo.classList.add('elemento-plegado');
                });
            
                listas.forEach(function (lista) {
                    lista.classList.add('elemento-plegado');
                });
                subtitulos.forEach(function (subtitulo) {
                    subtitulo.classList.add('elemento-plegado');
                });
                imagenes.forEach(function (imagen) {
                    imagen.classList.add('elemento-plegado');
                });
                formularios.forEach(function (formulario) {
                formulario.classList.add('formulario-plegado');
                });

            } else {

                flecha.textContent = ' ▾';

                parrafos.forEach(function (parrafo) {
                    parrafo.classList.remove('elemento-plegado');
                });

                listas.forEach(function (lista) {
                    lista.classList.remove('elemento-plegado');
                });

                subtitulos.forEach(function (subtitulo) {
                    subtitulo.classList.remove('elemento-plegado');
                });

                imagenes.forEach(function (imagen) {
                    imagen.classList.remove('elemento-plegado');
                });
                formularios.forEach(function (formulario) {
                formulario.classList.remove('formulario-plegado');
                });
            }
        });
    }
});
const formularioDiscusion = document.querySelector('#form-discusion');
const campoNombre = document.querySelector('#input-nombre');
const campoComentario = document.querySelector('#texto-comentario');
const contadorCaracteres = document.querySelector('#contador-caracteres');
const avisoFormulario = document.querySelector('#aviso-formulario');
const listaComentarios = document.querySelector('#lista-de-comentarios');


campoComentario.addEventListener('input', function () {
    const caracteresUsados = campoComentario.value.length;
    contadorCaracteres.textContent = `${caracteresUsados} / 200`;

    if (caracteresUsados > 200) {
        contadorCaracteres.classList.add('contador-error');
        campoComentario.classList.add('campo-error');

        if (document.body.classList.contains('fondo-oscuro')) {
            contadorCaracteres.classList.add('contador-error-oscuro');
        }

    } else {
        contadorCaracteres.classList.remove('contador-error');
        contadorCaracteres.classList.remove('contador-error-oscuro');
        campoComentario.classList.remove('campo-error');
    }
});


formularioDiscusion.addEventListener('submit', function (e) {

    e.preventDefault();

    avisoFormulario.textContent = '';
    campoNombre.classList.remove('campo-error');
    campoComentario.classList.remove('campo-error');

    const nombre = campoNombre.value.trim();
    const comentario = campoComentario.value.trim();

    if (nombre === '') {
        avisoFormulario.textContent = 'El nombre no puede estar vacío. ';
        campoNombre.classList.add('campo-error');
    }

    if (comentario.length < 10 || comentario.length > 200) {
        avisoFormulario.textContent += 'El comentario debe tener entre 10 y 200 caracteres.';
        campoComentario.classList.add('campo-error');
    }

    if (avisoFormulario.textContent !== '') {
        return;
    }

    crearComentario(nombre, comentario);

    formularioDiscusion.reset();
    contadorCaracteres.textContent = '0 / 200';
    contadorCaracteres.classList.remove('contador-error');
});


function crearComentario(nombre, comentario) {

    const elementoComentario = document.createElement('li');
    const nombreComentario = document.createElement('strong');
    const textoComentario = document.createElement('p');
    const botonBorrar = document.createElement('button');

    nombreComentario.textContent = nombre;
    textoComentario.textContent = comentario;
    botonBorrar.textContent = 'Borrar';

    botonBorrar.classList.add('boton-borrar-comentario');

    elementoComentario.append(nombreComentario);
    elementoComentario.append(textoComentario);
    elementoComentario.append(botonBorrar);

    listaComentarios.append(elementoComentario);
}


listaComentarios.addEventListener('click', function (e) {

    if (e.target.classList.contains('boton-borrar-comentario')) {
        e.target.parentElement.remove();
    }
});

const botonActivarLectura = document.querySelector('#boton-activar-lectura');
const botonSalirLectura = document.querySelector('#boton-salir-lectura');
const contenedor = document.querySelector('.contenedor-wiki');

botonActivarLectura.addEventListener('click', function () {
    document.body.classList.add('modo-lectura');
    botonActivarLectura.classList.add('elemento-plegado');
    botonSalirLectura.classList.add('boton-visible');
    contenedor.classList.add('contenedor-lectura');
});

botonSalirLectura.addEventListener('click', function () {
    document.body.classList.remove('modo-lectura');
    botonActivarLectura.classList.remove('elemento-plegado');
    botonSalirLectura.classList.remove('boton-visible');
    contenedor.classList.remove('contenedor-lectura');
});



const buscadorArticulo = document.querySelector('#buscador-articulo');
const resultadoBusqueda = document.querySelector('#resultado-busqueda');
const seccionesArticulo = document.querySelectorAll('main section');

buscadorArticulo.addEventListener('change', function () {

    const palabra = buscadorArticulo.value.toLowerCase().trim();
    let cantidadResultados = 0;

    seccionesArticulo.forEach(function (seccion) {

    const titulo = seccion.querySelector('h2');

    if (titulo && titulo.id !== 'discusion') {

const parrafos = seccion.querySelectorAll('p');

    parrafos.forEach(function (parrafo) {

             if (!parrafo.classList.contains('texto-imagen')) {

              const contenido = parrafo.textContent.toLowerCase();
                 parrafo.classList.remove('parrafo-encontrado');
parrafo.classList.remove('parrafo-encontrado-oscuro');

if (palabra !== '' && contenido.includes(palabra)) {
    parrafo.classList.add('parrafo-encontrado');

    if (document.body.classList.contains('fondo-oscuro')) {
        parrafo.classList.add('parrafo-encontrado-oscuro');
    }

    cantidadResultados++;
}
        }
    });
      }
    });

    if (palabra === '') {
        resultadoBusqueda.textContent = '';
    } else if (cantidadResultados === 0) {
        resultadoBusqueda.textContent = 'No se encontraron resultados.';
    } else {
        
        resultadoBusqueda.textContent = 'Se encontraron ' + cantidadResultados + ' párrafos.';
    }
});