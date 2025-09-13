let audioCtx

/**
 * Toca um som de feedback usando a Web Audio API.
 * @param {'correct' | 'incorrect'} type - O tipo de som a ser tocado.
 * @param {'sound' | 'visual'} feedbackPreference - A preferência de feedback do usuário.
 */
export function playSound ( type, feedbackPreference ) {
    if ( feedbackPreference !== 'sound' ) return

    if ( !audioCtx ) {
        try {
            audioCtx = new ( window.AudioContext || window.webkitAudioContext )()
        } catch ( e ) {
            console.error( "Web Audio API não é suportada neste navegador.", e )
            return
        }
    }

    const oscillator = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    oscillator.type = ( type === 'correct' ) ? 'sine' : 'square'
    oscillator.frequency.setValueAtTime( ( type === 'correct' ) ? 600 : 150, audioCtx.currentTime )
    gainNode.gain.setValueAtTime( 0.2, audioCtx.currentTime )

    oscillator.connect( gainNode )
    gainNode.connect( audioCtx.destination )

    oscillator.start()
    oscillator.stop( audioCtx.currentTime + 0.15 )
}
