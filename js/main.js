import { initializeConfigurator, getGameConfig } from './configurator.js'
import { buildGame } from './game.js'
import { setupUI } from './ui.js'

// Função de inicialização da aplicação
function init () {
    // Configura os elementos da UI que não mudam (ex: cards de desenvolvedores)
    setupUI()

    // Inicializa a lógica da tela de configuração
    initializeConfigurator( () => {
        // Esta função (callback) será chamada quando o botão "Construir" for clicado
        const config = getGameConfig()
        buildGame( config )
    } )
}

// Inicia a aplicação quando o DOM estiver completamente carregado
document.addEventListener( 'DOMContentLoaded', init )
