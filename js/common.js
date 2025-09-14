// Importa e executa a lógica de elementos comuns a todas as páginas.
import './nav.js'
import { developerData } from './data.js'

/**
 * Renderiza o rodapé global com as informações dos desenvolvedores.
 * Esta função será executada em todas as páginas que importarem este módulo.
 */
function initializeFooter () {
    // Procura pelo container dos desenvolvedores em todo o documento.
    const developersContainer = document.querySelector( 'footer .grid' )

    // Se o container existir, preenche com os dados.
    if ( developersContainer ) {
        // Limpa o container para evitar duplicação ao navegar
        developersContainer.innerHTML = ''

        developerData.forEach( dev => {
            const devHTML = `
                <div class="flex flex-col items-center text-center">
                    <img src="${ dev.photo }" alt="Foto de ${ dev.name }" class="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-600" >
                    <h4 class="font-bold text-lg text-white">${ dev.name }</h4>
                    <p class="text-sm text-gray-400">Licenciatura em Ciência da Computação</p>
                    <p class="text-xs text-gray-500">Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso do Sul - Campus Jardim</p>
                </div>`
            developersContainer.innerHTML += devHTML
        } )
    }
}

// Executa a função assim que o script é carregado.
initializeFooter()
