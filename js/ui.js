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
 */
export function setupUI () {
    const pillars = [
        { name: 'theme', title: '1. Tema (Engajamento)', color: 'text-blue-400', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l4 4m-4-4l4-4m-4 4h12a4 4 0 014 4v1m-4-8l-4-4m4 4l-4 4" /></svg>', description: 'Qual será o objetivo educacional do nosso jogo?', options: [ { value: 'tabuada', text: 'Tabuada' }, { value: 'capitais', text: 'Capitais' }, { value: 'agua', text: 'Ciclo da Água' } ] },
        { name: 'mechanic', title: '2. Mecânica (Interação)', color: 'text-green-400', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>', description: 'Como o jogador irá interagir para responder?', options: [ { value: 'choice', text: 'Múltipla Escolha' }, { value: 'drag', text: 'Arrastar e Soltar' }, { value: 'type', text: 'Digitar Resposta' } ] },
        { name: 'rule', title: '3. Regra (Desafio)', color: 'text-red-400', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>', description: 'Qual condição adicionará um desafio ao jogo?', options: [ { value: 'time', text: 'Limite de Tempo' }, { value: 'lives', text: 'Sistema de Vidas' } ] },
        { name: 'feedback', title: '4. Feedback (Comunicação)', color: 'text-yellow-400', icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>', description: 'Como o jogo comunicará o acerto ou erro?', options: [ { value: 'visual', text: 'Apenas Visual' }, { value: 'sound', text: 'Visual + Sons' } ] }
    ]

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

    const developers = [
        { name: 'Talita Mendonça Marques', photo: 'https://github.com/skyzinha-chan/Criador-de-Mini-Jogos-Didaticos/blob/main/assets/talita-mendonca.jpg?raw=true' },
        { name: 'Leonardo Vinicius da Costa Gomes', photo: 'https://github.com/skyzinha-chan/Criador-de-Mini-Jogos-Didaticos/blob/main/assets/leonardo-vinicius.jpg?raw=true' }
    ]

    const developersContainer = uiElements.configurator.querySelector( 'footer .grid' )
    developers.forEach( dev => {
        const devHTML = `
            <div class="flex flex-col items-center text-center">
                <img src="${ dev.photo }" alt="Foto de ${ dev.name }" class="w-32 h-32 rounded-full object-cover mb-4 border-2 border-gray-600">
                <h4 class="font-bold text-lg text-white">${ dev.name }</h4>
                <p class="text-sm text-gray-400">Licenciatura em Ciência da Computação</p>
                <p class="text-xs text-gray-500">Instituto Federal de Mato Grosso do Sul</p>
            </div>`
        developersContainer.innerHTML += devHTML
    } )
}
