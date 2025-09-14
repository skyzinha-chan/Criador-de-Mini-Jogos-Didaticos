import { pillarData as defaultPillarData, questions as defaultQuestions, themeTitles as defaultThemeTitles } from './data.js'

/**
 * Carrega os dados padrão e os mescla com os dados personalizados do localStorage.
 * @returns {object} - Um objeto contendo pillarData, questions e themeTitles mesclados.
 */
export function loadData () {
    // Clones profundos para evitar mutação dos dados originais
    const pillarData = JSON.parse( JSON.stringify( defaultPillarData ) )
    const questions = JSON.parse( JSON.stringify( defaultQuestions ) )
    const themeTitles = JSON.parse( JSON.stringify( defaultThemeTitles ) )

    const customData = JSON.parse( localStorage.getItem( 'customGameData' ) ) || { themes: {}, questions: {} }

    const themePillar = pillarData.find( p => p.name === 'theme' )

    // Mescla temas personalizados
    for ( const themeKey in customData.themes ) {
        const themeName = customData.themes[ themeKey ]
        // Adiciona ao pillarData se ainda não existir
        if ( !themePillar.options.some( opt => opt.value === themeKey ) ) {
            themePillar.options.push( { value: themeKey, text: themeName } )
        }
        // Adiciona aos themeTitles
        themeTitles[ themeKey ] = themeName
    }

    // Mescla perguntas personalizadas
    for ( const themeKey in customData.questions ) {
        if ( !questions[ themeKey ] ) {
            questions[ themeKey ] = []
        }
        questions[ themeKey ].push( ...customData.questions[ themeKey ] )
    }

    return { pillarData, questions, themeTitles }
}
