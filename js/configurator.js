import { uiElements } from './ui.js'

const gameConfig = { theme: null, mechanic: null, rule: null, feedback: null }
let onBuildCallback = () => { } // Função vazia por padrão

/**
 * Atualiza a barra de progresso e o estado do botão de construção.
 */
function checkAllSelected () {
    const selectedCount = Object.values( gameConfig ).filter( val => val !== null ).length
    const progressPercentage = ( selectedCount / 4 ) * 100
    uiElements.progressBar.style.width = `${ progressPercentage }%`

    const allSelected = selectedCount === 4
    uiElements.buildButton.disabled = !allSelected
}

/**
 * Inicializa os event listeners para a tela de configuração.
 * @param {Function} buildCallback - A função a ser chamada quando o jogo for construído.
 */
export function initializeConfigurator ( buildCallback ) {
    onBuildCallback = buildCallback

    document.querySelectorAll( '[data-pillar]' ).forEach( container => {
        container.addEventListener( 'click', ( e ) => {
            if ( e.target.tagName === 'BUTTON' ) {
                const pillar = container.dataset.pillar
                const value = e.target.dataset.value
                gameConfig[ pillar ] = value

                container.querySelectorAll( 'button' ).forEach( btn => {
                    btn.classList.remove( 'selected', 'theme-selected', 'mechanic-selected', 'rule-selected', 'feedback-selected' )
                } )
                e.target.classList.add( 'selected', `${ pillar }-selected` )
                checkAllSelected()
            }
        } )
    } )

    uiElements.buildButton.addEventListener( 'click', () => {
        uiElements.buildButton.disabled = true
        uiElements.buildButton.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Construindo...`

        setTimeout( () => {
            onBuildCallback()
            uiElements.buildButton.disabled = false
            uiElements.buildButton.innerHTML = '🎮 Construir Protótipo do Jogo 🕹️!'
        }, 1000 )
    } )

    checkAllSelected()
}

/**
 * Retorna o objeto de configuração do jogo atual.
 * @returns {object} A configuração do jogo.
 */
export function getGameConfig () {
    return gameConfig
}
