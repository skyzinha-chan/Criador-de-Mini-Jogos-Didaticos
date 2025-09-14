import './common.js' // Importa e executa a lógica do rodapé

const cards = document.querySelectorAll( '.card' )
const dropZones = document.querySelectorAll( '.drop-zone' )

let draggedCard = null

cards.forEach( card => {
    card.addEventListener( 'dragstart', ( e ) => {
        draggedCard = e.target
        setTimeout( () => e.target.classList.add( 'dragging' ), 0 )
    } )

    card.addEventListener( 'dragend', ( e ) => {
        e.target.classList.remove( 'dragging' )
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

        if ( draggedCard ) {
            const cardCategory = draggedCard.dataset.category
            const zoneCategory = zone.dataset.category

            if ( cardCategory === zoneCategory ) {
                zone.appendChild( draggedCard )
                draggedCard.style.backgroundColor = '#16a34a' // Verde para acerto
                draggedCard.draggable = false
            } else {
                // Feedback de erro
                draggedCard.style.backgroundColor = '#dc2626' // Vermelho para erro
                setTimeout( () => {
                    draggedCard.style.backgroundColor = '#16a34a' // Volta para a cor original
                }, 1000 )
            }
            draggedCard = null
        }
    } )
} )
