// Importa lógicas comuns para a página (navegação e rodapé).
import './common.js'
// Importa a função de áudio que já criamos.
import { playSound } from './audio.js'

const feedbackButton = document.getElementById( 'feedback-button' )
const feedbackText = document.getElementById( 'feedback-text' )
const feedbackRadios = document.querySelectorAll( 'input[name="feedbackType"]' )

feedbackButton.addEventListener( 'click', () => {
    const feedbackPreference = document.querySelector( 'input[name="feedbackType"]:checked' ).value

    // Feedback visual
    feedbackText.textContent = 'Ação registrada com sucesso!'
    feedbackText.classList.remove( 'opacity-0', 'text-red-400' )
    feedbackText.classList.add( 'text-green-400' )
    feedbackText.classList.add( 'opacity-100' )

    document.body.classList.add( 'correct-answer-glow' )

    // Feedback sonoro (se selecionado)
    playSound( 'correct', feedbackPreference )

    // Reseta o feedback visual após um tempo
    setTimeout( () => {
        feedbackText.classList.add( 'opacity-0' )
        document.body.classList.remove( 'correct-answer-glow' )
    }, 1500 )
} )
