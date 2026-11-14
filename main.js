/* 
(Indice automatico)    
primero genero el índice de forma automática, para esto tomo todos los
 títulos h2 que se encuentran dentro de main y recorro la lista, creando un
 elemento li y un enlace por cada uno. el texto del enlace se obtiene del
 propio título y su destino se establece usando el id correspondiente, así,
 si más adelante agrego, elimino o modifico una sección, el índice se actualiza
 sin tener que cambiarlo manualmente. también tengo en cuenta que los titulos
 deben conservar el mismo orden en el que aparecen en el artículo.
*/


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

 /*(modo oscurp)
 después implemento el cambio entre el modo claro y el modo oscuro. la idea
 es que el usuario pueda modificar la apariencia de toda la wiki desde un
 único botón, sin tener que cambiar los colores de cada elemento por separado.
 para hacerlo utilizo clases de css, de manera que javascript solamente se
 encarga de activarlas o desactivarlas y los estilos quedan definidos en el
 archivo css. también considero los distintos elementos que aparecen en las
 páginas, como los títulos, enlaces, imágenes, campos del formulario y botones,
 para que el cambio de tema sea lo más completo posible. además, modifico el
 texto del botón según el tema activo, así queda indicado qué modo se puede
 seleccionar a continuación.
*/
const BotonDelTema = document.querySelector('#boton-de-tema');
const contenedor = document.querySelector('.contenedor-wiki');
const tituloBusqueda = document.querySelector('.titulo-busqueda');

const campoNombre = document.querySelector('#input-nombre');
const campoComentario = document.querySelector('#texto-comentario');
const buscadorArticulo = document.querySelector('#buscador-articulo');
const contadorCaracteres = document.querySelector('#contador-caracteres');

const articulo = document.querySelector('main');
const paneles = document.querySelectorAll('aside, .imagen-contextual, .panel-de-busqueda');
const subtitulos = document.querySelectorAll('aside h2, aside h3, main h2, main h3, main .texto-imagen');

const enlaces = document.querySelectorAll('aside a, main a');
const parrafosArticulo = document.querySelectorAll('main p');
const footer = document.querySelector('footer');

BotonDelTema.addEventListener('click', function () {

    document.body.classList.toggle('fondo-oscuro');

    contenedor.classList.toggle('contenedor-oscuro');


    paneles.forEach(function (panel) {
        panel.classList.toggle('panel-oscuro');
    });

    articulo.classList.toggle('panel-oscuro');

    subtitulos.forEach(function (subtitulo) {
        subtitulo.classList.toggle('texto-oscuro');
    });


enlaces.forEach(function (enlace) {
    enlace.classList.toggle('enlace-oscuro');
});

buscadorArticulo.classList.toggle('campo-oscuro');
campoNombre.classList.toggle('campo-oscuro');
campoComentario.classList.toggle('campo-oscuro');

parrafosArticulo.forEach(function (parrafo) {
    if (parrafo.classList.contains('parrafo-encontrado')) {
        parrafo.classList.toggle('parrafo-encontrado-oscuro');
    }
});

tituloBusqueda.classList.toggle('titulo-busqueda-oscuro');
contadorCaracteres.classList.toggle('texto-oscuro');

if (document.body.classList.contains('fondo-oscuro')) {
    if (contadorCaracteres.classList.contains('contador-error')) {
        contadorCaracteres.classList.add('contador-error-oscuro');
    }
} else {
    contadorCaracteres.classList.remove('contador-error-oscuro');
}

const botones = document.querySelectorAll('button');

botones.forEach(function (boton) {
    boton.classList.toggle('boton-oscuro');

    if (boton.classList.contains('boton-enviar-comentario')) {
        boton.classList.toggle('boton-enviar-oscuro');
    }
});

footer.classList.toggle('borde-footer-oscuro');

if (document.body.classList.contains('fondo-oscuro')) {
    BotonDelTema.textContent = 'Modo claro';
} else {
    BotonDelTema.textContent = 'Modo oscuro';
}
});
/*(Cambiar tamaño letras)
en esta parte agrego la posibilidad de cambiar el tamaño del texto del
 artículo, para que cada usuario pueda elegir la opción que le resulte más
 cómoda para leer. en vez de repetir las mismas instrucciones para cada
 botón, hago una función que se encarga de realizar todo el cambio y recibe
 como datos el tamaño que se quiere aplicar y el botón que fue seleccionado.
 primero quito las clases de los tamaños anteriores, para evitar que se
acumulen y terminen afectando el resultado, después aplico la nueva clase
al artículo. también actualizo los botones para que solamente uno aparezca
 como seleccionado, manteniendo siempre una única opción activa. por último,
dejo seleccionado el tamaño estándar al cargar la página, así el artículo
comienza con una configuración normal y el usuario puede cambiarla cuando
 quiera.
*/
const botonTextoPequeño = document.querySelector('#Texto-Pequeño');
const botonTextoNormal = document.querySelector('#Texto-Normal');
const botonTextoGrande = document.querySelector('#Texto-Grande');

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


/* (secciones pplegables) ahora agrego la función para plegar y desplegar las distintas secciones del
 artículo, para hacerlo recorro todas las secciones que se encuentran dentro
 de main y trabajo con cada una por separado, así el usuario puede ocultar
 una sección sin afectar a las demás. dentro de cada sección identifico los
 elementos que forman parte de su contenido, como los párrafos, las listas,
 los subtítulos, las imágenes y los formularios. dejo el h2 visible porque
 es el elemento que permite volver a desplegar la sección. también agreg
  una flecha al título para indicar si el contenido está desplegado o plegado,
 y la actualizo cada vez que se hace clic. utilizo clases de css para ocultar
 y mostrar los elementos, manteniendo separados los cambios visuales de la
 lógica de javascript. además, como el índice se genera antes de agregar las

 flechas, estas no aparecen junto al nombre de las secciones en el índice.*/


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
/* formulario discusion

 primero guardo los elementos que necesito utilizar, como los campos del
 nombre y del comentario, el contador de caracteres, el aviso para mostrar
 errores y la lista donde se van a agregar los comentarios. también tengo
 en cuenta que el comentario debe tener una extensión mínima y máxima, y
 que el nombre no puede quedar vacío o estar formado solamente por espaciis.
 por otro lado, actualizo el contador mientras el usuario escribe, para que
 pueda saber cuántos caracteres lleva y cuánto le falta para llegar al límite.
 si supera los 200 caracteres, marco el campo y el contador para señalar el
 problema. también considero el modo oscuro, para que el aviso de error
 conserve una apariencia adecuada cuando se cambia el tema de la página.
*/


const formularioDiscusion = document.querySelector('#form-discusion');

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
contadorCaracteres.classList.remove('contador-error-oscuro');
});

/* (dIscusion)
 creo esta función para organizar la forma en la que se agrega cada comentario
 a la lista. recibe el nombre y el texto que escribió el usuario, y a partir
 de esos datos crea los elementos necesarios para mostrarlo en la página.
 utilizo createElement para generar los elementos desde javascript y
 textContent para colocar el contenido ingresado, en lugar de interpretarlo como  html,
 esto es importante porque permite mostrar correctamente
 lo que escribió el usuario, incluso si incluye símbolos o etiquetas, sin
 que se conviertan en elementos de la página. también agrego un botón para
 poder borrar ese comentario después y finally incorporo todo a la lista.

*/
function crearComentario(nombre, comentario) {

    const elementoComentario = document.createElement('li');
    const nombreComentario = document.createElement('strong');
    const textoComentario = document.createElement('p');
    const botonBorrar = document.createElement('button');

    nombreComentario.textContent = nombre;
    textoComentario.textContent = comentario;
    botonBorrar.textContent = 'Borrar';

    botonBorrar.classList.add('boton-borrar-comentario');
    if (document.body.classList.contains('fondo-oscuro')) {
    botonBorrar.classList.add('boton-oscuro');
}

    elementoComentario.append(nombreComentario);
    elementoComentario.append(textoComentario);
    elementoComentario.append(botonBorrar);

    listaComentarios.append(elementoComentario);
}

/* para borrar los comentarios utilizo un único evento sobre la lista completa,
 en lugar de tener que agregar un evento a cada botón por separado. esto
 también sirve para los comentarios que se crean después de cargar la página,
 ya que sus botones todavía no existían cuando se ejecutó el resto del código.
 cuando se hace clic dentro de la lista, compruebo si el elemento seleccionado
 es uno de los botones para borrar. si lo es, elimino el elemento que contiene
 ese botón, de esta manera solamente se borra el comentario correspondiente
 y no se modifica el resto de la lista.
*/
 listaComentarios.addEventListener('click', function (e) {

    if (e.target.classList.contains('boton-borrar-comentario')) {
        e.target.parentElement.remove();
    }
});

/*  (modo lectura)
 agrego un modo lectura para que el usuario pueda concentrarse en el contenido
 del artículo sin tener tantos elementos de la wiki around. para activarlo
 utilizo un botón que agrega una clase al body y otra al contenedor principal,
 dejando que css se encargue de modificar la presentación de la página.
 también oculto el botón de activación y muestro el de salida, así queda
 disponible una forma sencilla de volver a la vista original. cuando el
 usuario sale del modo lectura, quito las clases y restauro la visibilidad
 de los botones. de esta manera no tengo que modificar individualmente cada
 elemento del artículo, sino que puedo controlar toda la apariencia mediante las clases .
 */
const botonActivarLectura = document.querySelector('#boton-activar-lectura');
const botonSalirLectura = document.querySelector('#boton-salir-lectura');

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

/*  buscador de articulo      
 por último agrego un buscador que permite encontrar palabras dentro del
 artículo sin tener que recorrer manualmente todas las secciones. cuando el
 usuario modifica el contenido del campo de búsqueda y termina de escribir,
 tomo la palabra ingresada, la paso a minúsculas y recorro los títulos para
 revisar el contenido de cada sección. antes de buscar, elimino las marcas
 de resultados anteriores para que no queden resaltados de una búsqueda
 previa. también tengo en cuenta que no se debe buscar dentro de la sección
de discusión ni en los textos que acompañan a las imágenes, porque no forman
 parte del contenido principal que quiero analizar. cuando encuentro la
 palabra, resalto el párrafo correspondiente y aumento la cantidad de
 resultados. al terminar, actualizo el mensaje que aparece debajo del
 buscador para indicar cuántas coincidencias se encontraron. si no se
 encuentra ninguna, también se informa para que el usuario sepa que la
 búsqueda se realizó correctamente.

 */
const resultadoBusqueda = document.querySelector('#resultado-busqueda');

buscadorArticulo.addEventListener('change', function () {

    const palabra = buscadorArticulo.value.toLowerCase().trim();
    let cantidadResultados = 0;

    titulos.forEach(function (titulo) {

    if (titulo.id !== 'discusion') {

        const seccion = titulo.parentElement;
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