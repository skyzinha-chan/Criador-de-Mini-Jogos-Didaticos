// --- ELEMENTOS DO DOM ---
const highContrastToggle = document.getElementById( 'high-contrast-toggle' )
const body = document.body

/**
 * Aplica ou remove a classe de alto contraste e salva a preferência.
 */
function toggleHighContrast () {
    body.classList.toggle( 'high-contrast' )
    const isEnabled = body.classList.contains( 'high-contrast' )
    localStorage.setItem( 'highContrastEnabled', isEnabled )
    highContrastToggle.setAttribute( 'aria-checked', isEnabled )
}

/**
 * Usa a Web Speech API para ler um texto em voz alta.
 * @param {string} text - O texto a ser falado.
 */
export function speakText ( text ) {
    if ( 'speechSynthesis' in window ) {
        // Para qualquer fala anterior para evitar sobreposição
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance( text )
        utterance.lang = 'pt-BR'
        utterance.rate = 0.9
        window.speechSynthesis.speak( utterance )
    } else {
        console.warn( 'A API de Síntese de Fala não é suportada neste navegador.' )
    }
}

/**
 * Configura o botão de áudio para uma pergunta específica.
 * @param {string} questionText - O texto da pergunta a ser lido.
 */
export function setupTextToSpeech ( questionText ) {
    const speakButton = document.getElementById( 'speak-question-btn' )
    if ( speakButton ) {
        speakButton.style.display = 'block'
        // Remove listener antigo para evitar múltiplos cliques
        const newButton = speakButton.cloneNode( true )
        speakButton.parentNode.replaceChild( newButton, speakButton )

        newButton.addEventListener( 'click', ( e ) => {
            e.stopPropagation() // Evita que o clique se propague para outros elementos
            speakText( questionText )
        } )
    }
}

/**
 * Inicializa todas as funcionalidades de acessibilidade.
 */
export function initializeAccessibility () {
    // Verifica a preferência salva para o alto contraste
    if ( localStorage.getItem( 'highContrastEnabled' ) === 'true' ) {
        body.classList.add( 'high-contrast' )
        highContrastToggle.setAttribute( 'aria-checked', true )
    }

    // Adiciona o evento de clique ao toggle
    highContrastToggle.addEventListener( 'click', toggleHighContrast )
}
