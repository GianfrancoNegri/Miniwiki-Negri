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

    const paneles = document.querySelectorAll('aside, main, .imagen-contextual');

    paneles.forEach(function (panel) {
        panel.classList.toggle('panel-oscuro');
    });

    const subtitulos = document.querySelectorAll('aside h2, aside h3, main h2, main h3, main .texto-imagen');

    subtitulos.forEach(function (subtitulo) {
        subtitulo.classList.toggle('texto-oscuro');
    });

    const enlaces = document.querySelectorAll('aside a, main a');

    enlaces.forEach(function (enlace) {
        enlace.classList.toggle('enlace-oscuro');
    });

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

    if (titulo) {

        const flecha = document.createElement('span');
        flecha.textContent = ' ▾';
        titulo.append(flecha);

        titulo.addEventListener('click', function () {

            seccion.classList.toggle('plegada');

            if (seccion.classList.contains('plegada')) {
                flecha.textContent = ' ▸';
            } else {
                flecha.textContent = ' ▾';
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
    } else {
        contadorCaracteres.classList.remove('contador-error');
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