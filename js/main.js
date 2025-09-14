// Importa a lógica do menu hambúrguer para que funcione em todas as páginas que usam este script.
import './nav.js'

// Importa os dados de conteúdo (pilares, desenvolvedores) do nosso módulo "biblioteca".
import { pillarData, developerData } from './data.js'

// Importa as funções de UI, como a que desenha a tela inicial.
import { initializeUI } from './ui.js'

// Importa as funções que controlam a lógica da tela de configuração.
import { initializeConfigurator, getGameConfig } from './configurator.js'

// Importa a função que constrói e inicia o jogo.
import { buildGame } from './game.js'

/**
 * Função principal que inicializa a aplicação na página index.html.
 * Ela orquestra a chamada dos outros módulos na ordem correta.
 */
function initApp () {
    // 1. Renderiza a interface inicial (cards dos pilares e dos desenvolvedores),
    // passando os dados importados do data.js.
    initializeUI( pillarData, developerData )

    // 2. Inicializa a lógica da tela de configuração.
    // Nós passamos para ela uma "função de callback", que é o que deve acontecer
    // quando o usuário finalmente clicar no botão "Construir".
    initializeConfigurator( () => {
        // 3. Quando o botão é clicado, primeiro pegamos a configuração que o usuário escolheu.
        const config = getGameConfig()
        // 4. Em seguida, chamamos a função para construir o jogo com essa configuração.
        buildGame( config )
    } )
}

// Este é um "ouvinte de eventos". Ele garante que todo o código JavaScript
// só será executado depois que a página HTML for completamente carregada pelo navegador.
// É uma boa prática fundamental para evitar erros.
document.addEventListener( 'DOMContentLoaded', initApp );

