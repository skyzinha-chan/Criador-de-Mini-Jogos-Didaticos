import { uiElements, switchScreen, showFeedback, updateStats, showEndGameScreen } from './ui.js'
import { playSound } from './audio.js'
// Importa a função para configurar o botão de áudio.
import { setupTextToSpeech } from './accessibility.js'

let currentConfig
let currentQuestionSet, currentQuestion, lives, timer, timerInterval, score, mistakesMade, highScore

/**
 * Inicia a construção e o estado inicial do jogo.
 * @param {object} config - O objeto de configuração vindo do configurator.
 * @param {object} questions - O objeto completo com todas as perguntas (padrão + custom).
 * @param {object} themeTitles - O objeto completo com todos os títulos de temas.
 */
export function buildGame ( config, questions, themeTitles ) {
    currentConfig = config
    switchScreen( 'game' )

    // Usa os dados recebidos para iniciar o jogo
    currentQuestionSet = [ ...questions[ currentConfig.theme ] ]
    uiElements.gameTitle.textContent = themeTitles[ currentConfig.theme ]

    // Inicializa o estado do jogo
    score = 0
    mistakesMade = 0
    highScore = localStorage.getItem( 'highScore' ) || 0

    if ( currentConfig.rule === 'lives' ) lives = 3
    if ( currentConfig.rule === 'time' ) timer = 15

    updateStats( currentConfig.rule, { lives, timer } )
    nextQuestion()
}

/**
 * Inicia o cronômetro do jogo.
 */
function startTimer () {
    clearInterval( timerInterval )
    timer = 15
    updateStats( currentConfig.rule, { timer } )
    timerInterval = setInterval( () => {
        timer--
        updateStats( currentConfig.rule, { timer } )
        if ( timer <= 0 ) {
            clearInterval( timerInterval )
            handleAnswer( false, true ) // timeOut = true
        }
    }, 1000 )
}

/**
 * Finaliza o jogo, calcula os resultados e exibe a tela de finalização.
 * @param {boolean} isWin - Se o jogador venceu.
 */
function endGame ( isWin ) {
    clearInterval( timerInterval )
    document.body.classList.remove( 'correct-answer-glow', 'incorrect-answer-glow' )

    document.getElementById( 'speak-question-btn' ).style.display = 'none' // Esconde o botão de áudio

    // Lógica de Recorde (High Score)
    if ( score > highScore ) {
        highScore = score
        localStorage.setItem( 'highScore', highScore )
    }

    // Lógica de Medalhas
    let medal = ''
    if ( isWin ) {
        if ( mistakesMade === 0 ) {
            medal = '🥇' // Ouro: Nenhuma vida perdida ou erro.
        } else if ( ( currentConfig.rule === 'lives' && lives >= 2 ) || ( currentConfig.rule === 'time' && mistakesMade <= 2 ) ) {
            medal = '🥈' // Prata: Poucos erros.
        } else {
            medal = '🥉' // Bronze: Apenas por completar.
        }
    }

    // Chama a função da UI para mostrar a tela final
    showEndGameScreen( {
        isWin: isWin,
        score: score,
        highScore: highScore,
        medal: medal,
    } )
}

/**
 * Processa a resposta do jogador e dá o feedback.
 * @param {boolean} isCorrect - Se a resposta foi correta.
 * @param {boolean} timeOut - Se a resposta foi por tempo esgotado.
 */
function handleAnswer ( isCorrect, timeOut = false ) {
    clearInterval( timerInterval )
    uiElements.answerArea.querySelectorAll( 'button, input, div[draggable]' ).forEach( el => el.style.pointerEvents = 'none' )

    document.body.classList.add( isCorrect ? 'correct-answer-glow' : 'incorrect-answer-glow' )
    playSound( isCorrect ? 'correct' : 'incorrect', currentConfig.feedback )

    if ( isCorrect ) {
        // Lógica de Pontuação
        let points = 100 // Pontos base
        if ( currentConfig.rule === 'time' && timer > 0 ) {
            points += timer * 10 // Bônus por tempo restante
        }
        score += points
        showFeedback( `Correto! +${ points } pontos`, 'correct' )
    } else {
        mistakesMade++
        uiElements.answerArea.classList.add( 'shake-animation' )
        const feedbackText = timeOut ? "Tempo esgotado!" : `Incorreto! A resposta era: ${ currentQuestion.a }`
        showFeedback( feedbackText, 'incorrect' )
        if ( currentConfig.rule === 'lives' ) {
            lives--
            updateStats( currentConfig.rule, { lives } )
            if ( lives <= 0 ) {
                setTimeout( () => endGame( false ), 2500 )
                return
            }
        }
    }
    setTimeout( () => {
        document.body.classList.remove( 'correct-answer-glow', 'incorrect-answer-glow' )
        nextQuestion()
    }, isCorrect ? 1500 : 2500 )
}

/**
 * Prepara e exibe a próxima pergunta do jogo.
 */
function nextQuestion () {
    showFeedback( '', 'none' )
    uiElements.answerArea.innerHTML = ''
    uiElements.answerArea.classList.remove( 'shake-animation' )

    if ( currentQuestionSet.length === 0 ) {
        endGame( true )
        return
    }
    const questionIndex = Math.floor( Math.random() * currentQuestionSet.length )
    currentQuestion = currentQuestionSet.splice( questionIndex, 1 )[ 0 ]

    // Atualiza o texto da pergunta e ativa o botão de fala
    uiElements.questionText.textContent = currentQuestion.q
    setupTextToSpeech( currentQuestion.q )

    const options = [ ...currentQuestion.o, currentQuestion.a ].sort( () => Math.random() - 0.5 )
    uiElements.answerArea.className = 'mt-8'

    renderMechanic( options )
    if ( currentConfig.rule === 'time' ) startTimer()
}

/**
 * Renderiza a área de resposta de acordo com a mecânica escolhida.
 * @param {Array<string>} options - As opções de resposta.
 */
function renderMechanic ( options ) {
    switch ( currentConfig.mechanic ) {
        case 'choice':
            uiElements.answerArea.classList.add( 'grid', 'grid-cols-2', 'gap-4' )
            options.forEach( opt => {
                const btn = document.createElement( 'button' )
                btn.textContent = opt
                btn.className = "w-full bg-gray-700 hover:bg-blue-600 p-3 rounded-lg text-lg transition-colors"
                btn.onclick = () => handleAnswer( opt === currentQuestion.a )
                uiElements.answerArea.appendChild( btn )
            } )
            break
        case 'drag':
            const dropZone = document.createElement( 'div' )
            dropZone.className = "w-full h-24 bg-gray-900 rounded-lg flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-600"
            dropZone.textContent = "Arraste a resposta correta aqui"
            const optionsContainer = document.createElement( 'div' )
            optionsContainer.className = "mt-4 grid grid-cols-4 gap-4"
            options.forEach( opt => {
                const btn = document.createElement( 'div' )
                btn.textContent = opt
                btn.draggable = true
                btn.className = "bg-gray-700 hover:bg-blue-600 p-3 rounded-lg text-lg cursor-grab"
                btn.ondragstart = ( e ) => e.dataTransfer.setData( "text/plain", opt )
                optionsContainer.appendChild( btn )
            } )
            dropZone.ondragover = ( e ) => e.preventDefault()
            dropZone.ondrop = ( e ) => {
                e.preventDefault()
                const data = e.dataTransfer.getData( "text/plain" )
                dropZone.textContent = `Resposta: ${ data }`
                handleAnswer( data === currentQuestion.a )
            }
            uiElements.answerArea.append( dropZone, optionsContainer )
            break
        case 'type':
            const input = document.createElement( 'input' )
            input.type = "text"
            input.className = "w-full bg-gray-900 p-3 rounded-lg text-center text-lg"
            input.placeholder = "Digite sua resposta..."
            const btn = document.createElement( 'button' )
            btn.textContent = "Verificar"
            btn.className = "w-full mt-4 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold"
            btn.onclick = () => handleAnswer( input.value.trim().toLowerCase() === currentQuestion.a.toLowerCase() )
            uiElements.answerArea.append( input, btn )
            input.focus()
            break
    }
}
