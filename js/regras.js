// Importa lógicas comuns para a página.
import './common.js' // Importa e executa a lógica do rodapé

// --- ELEMENTOS DO DOM ---
const timeRuleCheckbox = document.getElementById( 'time-rule' )
const obstacleRuleCheckbox = document.getElementById( 'obstacle-rule' )
const gameScreen = document.getElementById( 'mini-game-screen' )
let scoreDisplay = document.getElementById( 'score' )
let timerDisplay = document.getElementById( 'timer-display' )
let timeValue = document.getElementById( 'time' )

// --- ESTADO DO JOGO ---
let score = 0
let timerInterval
let timeLeft = 10
let gameActive = true

// --- FUNÇÕES DE FEEDBACK E UI ---

/**
 * Exibe a tela de "Fim de Jogo" sobre a tela do jogo.
 */
function showEndGameScreen () {
    // Cria o overlay
    const overlay = document.createElement( 'div' )
    overlay.id = 'end-game-overlay'
    overlay.className = 'absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center text-center p-4 z-10'

    // Cria o conteúdo da tela
    overlay.innerHTML = `
        <h2 class="text-3xl font-bold text-yellow-400 mb-2">Fim de Jogo!</h2>
        <p class="text-xl mb-4">Sua pontuação final foi: <span class="font-bold text-white">${ score }</span></p>
        <button id="play-again-btn" class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
            Jogar Novamente
        </button>
    `

    gameScreen.appendChild( overlay )

    // Adiciona o evento de clique ao novo botão
    document.getElementById( 'play-again-btn' ).addEventListener( 'click', resetGame )
}

// --- FUNÇÕES PRINCIPAIS DO JOGO ---

/**
 * Cria um item clicável (moeda ou obstáculo).
 */
function createItem ( isObstacle = false ) {
    if ( !gameScreen ) return
    const item = document.createElement( 'div' )
    item.className = 'absolute w-8 h-8 rounded-full cursor-pointer transition-all duration-300'

    if ( isObstacle ) {
        item.classList.add( 'bg-red-500', 'obstacle' )
    } else {
        item.classList.add( 'bg-yellow-400', 'coin' )
    }

    item.style.top = `${ Math.random() * ( gameScreen.clientHeight - 32 ) }px`
    item.style.left = `${ Math.random() * ( gameScreen.clientWidth - 32 ) }px`

    item.addEventListener( 'click', () => {
        if ( !gameActive ) return

        if ( isObstacle ) {
            score = 0 // Penalidade
            gameScreen.classList.add( 'shake-animation' ) // Feedback "Juicy"
            setTimeout( () => gameScreen.classList.remove( 'shake-animation' ), 500 )
        } else {
            score++
            item.classList.add( 'item-pop' ) // Animação de "pop"
        }

        // Remove o item após a animação
        setTimeout( () => item.remove(), 200 )

        if ( !isObstacle ) {
            createItem( false ) // Cria uma nova moeda
        }
        updateScore()
    } )

    gameScreen.appendChild( item )
}

/**
 * Atualiza a exibição da pontuação.
 */
function updateScore () {
    if ( scoreDisplay ) {
        scoreDisplay.textContent = score
    }
}

/**
 * Inicia ou para o cronômetro.
 */
function handleTimer () {
    if ( !timeRuleCheckbox || !timerDisplay || !timeValue ) return

    if ( timeRuleCheckbox.checked ) {
        timerDisplay.classList.remove( 'hidden' )
        gameActive = true
        timeLeft = 10
        timeValue.textContent = timeLeft

        clearInterval( timerInterval )
        timerInterval = setInterval( () => {
            timeLeft--
            timeValue.textContent = timeLeft
            if ( timeLeft <= 0 ) {
                clearInterval( timerInterval )
                gameActive = false
                showEndGameScreen() // Substitui o alert()
            }
        }, 1000 )
    } else {
        clearInterval( timerInterval )
        timerDisplay.classList.add( 'hidden' )
    }
}

/**
 * Adiciona ou remove obstáculos da tela.
 */
function handleObstacles () {
    document.querySelectorAll( '.obstacle' ).forEach( obs => obs.remove() )
    if ( obstacleRuleCheckbox && obstacleRuleCheckbox.checked ) {
        for ( let i = 0; i < 5; i++ ) {
            createItem( true )
        }
    }
}

/**
 * Reinicia e configura o estado do jogo com base nas regras ativas.
 */
function resetGame () {
    if ( !gameScreen ) return

    // Remove a tela de "Fim de Jogo" se ela existir
    const endGameOverlay = document.getElementById( 'end-game-overlay' )
    if ( endGameOverlay ) {
        endGameOverlay.remove()
    }

    gameActive = true
    score = 0
    updateScore()

    // Limpa apenas os itens do jogo (moedas e obstáculos)
    gameScreen.querySelectorAll( '.coin, .obstacle' ).forEach( item => item.remove() )

    createItem( false ) // Sempre começa com uma moeda
    handleObstacles()
    handleTimer()
}

// --- INICIALIZAÇÃO E EVENT LISTENERS ---
if ( timeRuleCheckbox && obstacleRuleCheckbox ) {
    timeRuleCheckbox.addEventListener( 'change', resetGame )
    obstacleRuleCheckbox.addEventListener( 'change', resetGame )

    document.addEventListener( 'DOMContentLoaded', resetGame )
}

