import './common.js' // Importa e executa a lógica do rodapé

const cards = document.querySelectorAll( '.card' )
const dropZones = document.querySelectorAll( '.drop-zone' )

// Variável para guardar o card que foi "pego" tanto pelo mouse quanto pelo teclado
let activeCard = null

// --- LÓGICA PARA MOUSE (DRAG AND DROP) ---
cards.forEach( card => {
    card.addEventListener( 'dragstart', ( e ) => {
        activeCard = e.target
        setTimeout( () => e.target.classList.add( 'dragging' ), 0 )
    } )

    card.addEventListener( 'dragend', ( e ) => {
        e.target.classList.remove( 'dragging' )
        activeCard = null
    } )
} )

dropZones.forEach( zone => {
    zone.addEventListener( 'dragover', ( e ) => {
        e.preventDefault()
        zone.classList.add( 'drag-over' )
    } )

    zone.addEventListener( 'dragleave', () => {
        zone.classList.remove( 'drag-over' )
    } )

    zone.addEventListener( 'drop', ( e ) => {
        e.preventDefault()
        zone.classList.remove( 'drag-over' )
        if ( activeCard ) handleDrop( activeCard, zone )
    } )
} )


// --- NOVA LÓGICA PARA TECLADO ---
cards.forEach( card => {
    card.addEventListener( 'keydown', ( e ) => {
        // Se a tecla for Enter ou Espaço, "pegamos" o card
        if ( e.key === 'Enter' || e.key === ' ' ) {
            e.preventDefault() // Evita que a página role ao apertar espaço
            if ( activeCard ) {
                activeCard.classList.remove( 'holding' )
            }
            activeCard = e.target
            activeCard.classList.add( 'holding' ) // Feedback visual que o card está "seguro"

            // Após pegar o card, movemos o foco para a primeira categoria
            if ( dropZones.length > 0 ) {
                dropZones[ 0 ].focus()
            }
        }
    } )
} )

dropZones.forEach( zone => {
    zone.addEventListener( 'keydown', ( e ) => {
        // Se a tecla for Enter ou Espaço E um card estiver "seguro", soltamos ele aqui
        if ( ( e.key === 'Enter' || e.key === ' ' ) && activeCard ) {
            e.preventDefault()
            handleDrop( activeCard, zone )
        }
    } )
} )

/**
 * Função central que lida com a lógica de "soltar" um card em uma zona,
 * seja vindo do mouse ou do teclado.
 * @param {HTMLElement} card - O card a ser solto.
 * @param {HTMLElement} zone - A zona onde o card será solto.
 */
function handleDrop ( card, zone ) {
    const cardCategory = card.dataset.category
    const zoneCategory = zone.dataset.category

    // Verifica se a categoria do card é a mesma da zona
    if ( cardCategory === zoneCategory ) {
        zone.appendChild( card )
        card.style.backgroundColor = '#16a34a' // Verde para acerto
        card.draggable = false // Impede de arrastar novamente
        card.removeAttribute( 'tabindex' ) // Remove do fluxo do Tab
        card.classList.remove( 'holding', 'dragging' )
    } else {
        // Feedback de erro
        card.style.backgroundColor = '#dc2626' // Vermelho para erro
        card.classList.remove( 'holding' )
        setTimeout( () => {
            // Remove a cor de erro (voltará para a cor original do CSS)
            card.style.backgroundColor = ''
        }, 1000 )
    }
    // Limpa o card ativo, finalizando a jogada
    activeCard = null
}