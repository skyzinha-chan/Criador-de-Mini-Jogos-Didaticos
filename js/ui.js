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
 * Insere dinamicamente os elementos de UI que não mudam, como os pilares e os cards de desenvolvedor.
 * @param {Array<object>} pillars - Os dados dos pilares para renderizar.
 * @param {Array<object>} developers - Os dados dos desenvolvedores para renderizar.
 */
export function initializeUI ( pillars, developers ) {
    const pillarsContainer = uiElements.configurator.querySelector( '.grid' )
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

    const developersContainer = uiElements.configurator.querySelector( 'footer .grid' )
    developers.forEach( dev => {
        const devHTML = `
            <div class="flex flex-col items-center text-center">
                <img src="${ dev.photo }" alt="Foto de ${ dev.name }" class="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-600">
                <h4 class="font-bold text-lg text-white">${ dev.name }</h4>
                <p class="text-sm text-gray-400">Licenciatura em Ciência da Computação</p>
                <p class="text-xs text-gray-500">Instituto Federal de Educação, Ciência e Tecnologia de Mato Grosso do Sul - Campus Jardim</p>
            </div>`
        developersContainer.innerHTML += devHTML
    } )
}
