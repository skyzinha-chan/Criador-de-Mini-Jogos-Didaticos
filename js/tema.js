// Importa lógicas comuns para a página (navegação e rodapé).
import './common.js'

const themeButtons = document.querySelectorAll( '.theme-button' )
const themeDisplay = document.getElementById( 'theme-display' )
const themeTitle = document.getElementById( 'theme-title' )
const themeDescription = document.getElementById( 'theme-description' )

const themeData = {
    'Tabuada': 'Um jogo onde você é um mago e precisa lançar feitiços (respostas corretas) para derrotar monstros matemáticos.',
    'Capitais': 'Um jogo de detetive onde você viaja pelo mundo reunindo pistas (fatos sobre países) para descobrir a capital secreta.',
    'Ciclo da Água': 'Uma aventura onde você controla uma gotícula de água em sua jornada pela evaporação, condensação e precipitação para voltar ao oceano.'
}

themeButtons.forEach( button => {
    button.addEventListener( 'click', () => {
        const theme = button.dataset.theme

        themeDisplay.classList.remove( 'opacity-0' )

        themeTitle.textContent = theme
        themeDescription.textContent = themeData[ theme ]
    } )
} )
