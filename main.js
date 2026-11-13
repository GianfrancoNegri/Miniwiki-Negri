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