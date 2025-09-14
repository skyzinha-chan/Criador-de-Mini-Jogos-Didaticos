// Centraliza as referências aos elementos do DOM para fácil acesso
export const uiElements = {
    configurator: document.getElementById( 'configurator' ),
    gameContainer: document.getElementById( 'game-container' ),
    progressBar: document.getElementById( 'progress-bar' ),
    buildButton: document.getElementById( 'build-button' ),
    restartButton: document.getElementById( 'restart-button' ),
    gameTitle: document.getElementById( 'game-title' ),
    gameStats: document.getElementById( 'game-stats' ),
    questionArea: document.getElementById( 'question-area' ),
    answerArea: document.getElementById( 'answer-area' ),
    feedbackMessage: document.getElementById( 'feedback-message' ),
    appContainer: document.getElementById( 'app-container' ),
}

/**
 * Controla a transição entre a tela de configuração e a tela do jogo.
 * @param {'config' | 'game'} screenName - O nome da tela a ser exibida.
 */
export function switchScreen ( screenName ) {
    if ( screenName === 'game' ) {
        uiElements.configurator.classList.add( 'hidden-screen' )
        setTimeout( () => {
            uiElements.gameContainer.classList.remove( 'hidden-screen' )
        }, 100 )
    } else {
        uiElements.gameContainer.classList.add( 'hidden-screen' )
        setTimeout( () => {
            uiElements.configurator.classList.remove( 'hidden-screen' )
        }, 100 )
    }
}

uiElements.restartButton.addEventListener( 'click', () => switchScreen( 'config' ) )

/**
 * Exibe a mensagem de feedback com a cor apropriada.
 * @param {string} text - O texto a ser exibido.
 * @param {'correct' | 'incorrect' | 'win' | 'lose' | 'none'} type - O tipo de feedback.
 */
export function showFeedback ( text, type ) {
    const classMap = {
        correct: "text-green-400",
        incorrect: "text-red-400",
        win: "text-yellow-400",
        lose: "text-gray-500",
        none: ""
    }
    uiElements.feedbackMessage.textContent = text
    uiElements.feedbackMessage.className = `mt-6 text-center text-2xl font-bold h-8 ${ classMap[ type ] }`
}

/**
 * Atualiza os status do jogo (vidas ou tempo) na tela.
 * @param {'lives' | 'time'} rule - A regra atual do jogo.
 * @param {object} data - Contém os valores de vidas ou tempo.
 */
export function updateStats ( rule, data ) {
    uiElements.gameStats.innerHTML = ''
    if ( rule === 'lives' ) {
        let hearts = Array.from( { length: 3 }, ( _, i ) =>
            `<span class="text-2xl ${ i < data.lives ? 'text-red-500' : 'text-gray-600' }">♥</span>`
        ).join( '' )
        uiElements.gameStats.innerHTML = `<div>${ hearts }</div>`
    } else if ( rule === 'time' ) {
        uiElements.gameStats.innerHTML = `<div class="text-yellow-400 text-2xl font-mono">${ String( data.timer ).padStart( 2, '0' ) }s</div>`
    }
}

/**
 * Insere dinamicamente os elementos de UI que não mudam, como os pilares.
 * @param {Array<object>} pillars - Os dados dos pilares para renderizar.
 */
export function initializeUI ( pillars ) {
    // Preenche os pilares na tela de configuração
    const pillarsContainer = uiElements.configurator.querySelector( '.grid' )
    if ( pillarsContainer ) {
        pillars.forEach( pillar => {
            const optionsHTML = pillar.options.map( opt => `<button class="option-button bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-2 font-medium" data-value="${ opt.value }">${ opt.text }</button>` ).join( '' )
            const pillarHTML = `
                <div class="space-y-3 p-4 bg-gray-900 rounded-lg border border-gray-700" data-pillar="${ pillar.name }">
                    <h2 class="text-xl font-semibold text-center ${ pillar.color } flex items-center justify-center gap-2">
                        ${ pillar.icon }
                        ${ pillar.title }
                    </h2>
                    <p class="text-center text-sm text-gray-400">${ pillar.description }</p>
                    <div class="flex flex-wrap justify-center gap-3">${ optionsHTML }</div>
                </div>`
            pillarsContainer.innerHTML += pillarHTML
        } )
    }

}

