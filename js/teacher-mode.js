import { loadData } from './data-manager.js'

// --- ELEMENTOS DO DOM ---
const teacherModeBtn = document.getElementById( 'teacher-mode-btn' )
const modalOverlay = document.getElementById( 'teacher-modal-overlay' )
const modal = document.getElementById( 'teacher-modal' )
const closeModalBtn = document.getElementById( 'close-teacher-modal-btn' )
const saveThemeBtn = document.getElementById( 'save-theme-btn' )
const saveQuestionBtn = document.getElementById( 'save-question-btn' )
const themeSelect = document.getElementById( 'question-theme-select' )
const feedbackEl = document.getElementById( 'teacher-modal-feedback' )

// --- INPUTS ---
const newThemeNameInput = document.getElementById( 'new-theme-name' )
const newQuestionTextInput = document.getElementById( 'new-question-text' )
const newQuestionAnswerInput = document.getElementById( 'new-question-answer' )
const newQuestionOption1Input = document.getElementById( 'new-question-option1' )
const newQuestionOption2Input = document.getElementById( 'new-question-option2' )
const newQuestionOption3Input = document.getElementById( 'new-question-option3' )


function showFeedback ( message, duration = 3000 ) {
    feedbackEl.textContent = message
    setTimeout( () => {
        feedbackEl.textContent = ''
    }, duration )
}

function openModal () {
    populateThemeSelect()
    modal.classList.remove( 'hidden' )
    modalOverlay.classList.remove( 'hidden' )
}

function closeModal () {
    modal.classList.add( 'hidden' )
    modalOverlay.classList.add( 'hidden' )
    // Força um recarregamento da página para que a tela de configuração mostre os novos temas
    window.location.reload()
}

function populateThemeSelect () {
    const { themeTitles } = loadData()
    themeSelect.innerHTML = '<option value="">Selecione um tema</option>'
    for ( const key in themeTitles ) {
        const option = document.createElement( 'option' )
        option.value = key
        option.textContent = themeTitles[ key ]
        themeSelect.appendChild( option )
    }
}

function saveTheme () {
    const themeName = newThemeNameInput.value.trim()
    if ( !themeName ) {
        showFeedback( "Por favor, insira um nome para o tema." )
        return
    }

    const themeKey = themeName.toLowerCase().replace( /\s+/g, '-' )
    const customData = JSON.parse( localStorage.getItem( 'customGameData' ) ) || { themes: {}, questions: {} }

    if ( customData.themes[ themeKey ] ) {
        showFeedback( "Esse tema já existe!" )
        return
    }

    customData.themes[ themeKey ] = themeName
    localStorage.setItem( 'customGameData', JSON.stringify( customData ) )

    showFeedback( `Tema "${ themeName }" salvo com sucesso!` )
    newThemeNameInput.value = ''
    populateThemeSelect()
}

function saveQuestion () {
    const selectedTheme = themeSelect.value
    const questionText = newQuestionTextInput.value.trim()
    const correctAnswer = newQuestionAnswerInput.value.trim()
    const options = [
        newQuestionOption1Input.value.trim(),
        newQuestionOption2Input.value.trim(),
        newQuestionOption3Input.value.trim(),
    ].filter( opt => opt ) // Filtra strings vazias

    if ( !selectedTheme || !questionText || !correctAnswer || options.length < 3 ) {
        showFeedback( "Por favor, preencha todos os campos da pergunta." )
        return
    }

    const newQuestion = {
        q: questionText,
        a: correctAnswer,
        o: options
    }

    const customData = JSON.parse( localStorage.getItem( 'customGameData' ) ) || { themes: {}, questions: {} }
    if ( !customData.questions[ selectedTheme ] ) {
        customData.questions[ selectedTheme ] = []
    }
    customData.questions[ selectedTheme ].push( newQuestion )
    localStorage.setItem( 'customGameData', JSON.stringify( customData ) )

    showFeedback( `Pergunta adicionada ao tema "${ themeSelect.options[ themeSelect.selectedIndex ].text }"!` )
    // Limpa os campos
    newQuestionTextInput.value = ''
    newQuestionAnswerInput.value = ''
    newQuestionOption1Input.value = ''
    newQuestionOption2Input.value = ''
    newQuestionOption3Input.value = ''
}


export function initializeTeacherMode () {
    teacherModeBtn.addEventListener( 'click', openModal )
    closeModalBtn.addEventListener( 'click', closeModal )
    modalOverlay.addEventListener( 'click', closeModal )
    saveThemeBtn.addEventListener( 'click', saveTheme )
    saveQuestionBtn.addEventListener( 'click', saveQuestion )
}
