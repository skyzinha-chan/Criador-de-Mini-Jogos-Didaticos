// Importa a lógica do menu hambúrguer para que funcione em todas as páginas que usam este script.
import './common.js'

// Importa a função que carrega e mescla todos os dados do jogo.
import { loadData } from './data-manager.js'

// Importa as funções de UI, como a que desenha a tela inicial.
import { initializeUI } from './ui.js'

// Importa as funções que controlam a lógica da tela de configuração.
import { initializeConfigurator, getGameConfig } from './configurator.js'

// Importa a função que constrói e inicia o jogo.
import { buildGame } from './game.js'

// Importa a lógica do novo Modo Professor.
import { initializeTeacherMode } from './teacher-mode.js'

// Importa a lógica de Acessibilidade.
import { initializeAccessibility } from './accessibility.js'

/**
 * Função principal que inicializa a aplicação na página index.html.
 * Ela orquestra a chamada dos outros módulos na ordem correta.
 */
function initApp () {
    // 1. Inicializa os controles de acessibilidade PRIMEIRO para que o tema seja aplicado.
    initializeAccessibility()

    // 2. Carrega todos os dados do jogo (padrão + personalizados).
    const { pillarData, questions, themeTitles } = loadData()

    // 3. Renderiza a interface inicial (cards dos pilares),
    // passando os dados mesclados.
    initializeUI( pillarData )

    // 4. Inicializa a lógica da tela de configuração.
    // Nós passamos para ela uma "função de callback", que é o que deve acontecer
    // quando o usuário finalmente clicar no botão "Construir".
    initializeConfigurator( () => {
        // 5. Quando o botão é clicado, primeiro pegamos a configuração que o usuário escolheu.
        const config = getGameConfig()
        // 6. Em seguida, chamamos a função para construir o jogo com os dados completos.
        buildGame( config, questions, themeTitles )
    } )

    // 7. Inicializa a lógica do modal do Modo Professor.
    initializeTeacherMode()
}

// Este é um "ouvinte de eventos". Ele garante que todo o código JavaScript
// só será executado depois que a página HTML for completamente carregada pelo navegador.
// É uma boa prática fundamental para evitar erros.
document.addEventListener( 'DOMContentLoaded', initApp );

