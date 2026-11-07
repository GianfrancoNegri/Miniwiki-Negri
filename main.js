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