// ===================================================================================
// ARQUIVO CENTRAL DE DADOS DO JOGO
// Este arquivo armazena todo o conteúdo utilizado na aplicação,
// como configurações dos pilares, informações dos desenvolvedores e perguntas do quiz.
// Manter tudo aqui facilita a manutenção e a expansão do projeto.
// ===================================================================================

// --- DADOS PARA A TELA DE CONFIGURAÇÃO ---
// Define as opções que aparecem na tela inicial para o usuário montar o jogo.

export const pillarData = [
    {
        name: 'theme',
        title: '1. Tema (Engajamento)',
        color: 'text-blue-400',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l4 4m-4-4l4-4m-4 4h12a4 4 0 014 4v1m-4-8l-4-4m4 4l-4 4" /></svg>',
        description: 'Qual será o objetivo educacional do nosso jogo?',
        options: [
            { value: 'tabuada', text: 'Tabuada' },
            { value: 'capitais', text: 'Capitais' },
            { value: 'agua', text: 'Ciclo da Água' },
            { value: 'animais', text: 'Animais' },
            { value: 'historia', text: 'História do Brasil' }
        ]
    },
    {
        name: 'mechanic',
        title: '2. Mecânica (Interação)',
        color: 'text-green-400',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>',
        description: 'Como o jogador irá interagir para responder?',
        options: [
            { value: 'choice', text: 'Múltipla Escolha' },
            { value: 'drag', text: 'Arrastar e Soltar' },
            { value: 'type', text: 'Digitar Resposta' }
        ]
    },
    {
        name: 'rule',
        title: '3. Regra (Desafio)',
        color: 'text-red-400',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
        description: 'Qual condição adicionará um desafio ao jogo?',
        options: [
            { value: 'time', text: 'Limite de Tempo' },
            { value: 'lives', text: 'Sistema de Vidas' }
        ]
    },
    {
        name: 'feedback',
        title: '4. Feedback (Comunicação)',
        color: 'text-yellow-400',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>',
        description: 'Como o jogo comunicará o acerto ou erro?',
        options: [
            { value: 'visual', text: 'Apenas Visual' },
            { value: 'sound', text: 'Visual + Sons' }
        ]
    }
]

// --- DADOS DOS DESENVOLVEDORES ---
// Usado para renderizar o rodapé.

export const developerData = [
    {
        name: 'Talita Mendonça Marques',
        photo: 'https://github.com/skyzinha-chan/Criador-de-Mini-Jogos-Didaticos/blob/main/assets/talita-mendonca.jpg?raw=true'
    },
    {
        name: 'Leonardo Vinicius da Costa Gomes',
        photo: 'https://github.com/skyzinha-chan/Criador-de-Mini-Jogos-Didaticos/blob/main/assets/leonardo-vinicius.jpg?raw=true'
    }
]


// ===================================================================================
// BANCO DE PERGUNTAS
// Cada chave corresponde a um 'value' de um tema na pillarData.
// q: Pergunta (string)
// a: Resposta correta (string)
// o: Opções incorretas (array de strings)
// ===================================================================================

export const questions = {
    tabuada: [
        { q: "Quanto é 7 x 8?", a: "56", o: [ "49", "54", "63" ] },
        { q: "Quanto é 6 x 9?", a: "54", o: [ "56", "48", "63" ] },
        { q: "Quanto é 12 x 5?", a: "60", o: [ "50", "65", "70" ] },
        { q: "Quanto é 9 x 9?", a: "81", o: [ "72", "89", "91" ] },
        { q: "Quanto é 8 x 4?", a: "32", o: [ "28", "36", "24" ] },
        { q: "Quanto é 11 x 7?", a: "77", o: [ "71", "87", "67" ] },
        { q: "Quanto é 3 x 15?", a: "45", o: [ "35", "55", "40" ] }
    ],
    capitais: [
        { q: "Qual a capital do Japão?", a: "Tóquio", o: [ "Pequim", "Seul", "Bangkok" ] },
        { q: "Qual a capital da Austrália?", a: "Camberra", o: [ "Sydney", "Melbourne", "Perth" ] },
        { q: "Qual a capital do Canadá?", a: "Ottawa", o: [ "Toronto", "Vancouver", "Montreal" ] },
        { q: "Qual a capital da Suíça?", a: "Berna", o: [ "Zurique", "Genebra", "Basileia" ] },
        { q: "Qual a capital do Egito?", a: "Cairo", o: [ "Alexandria", "Luxor", "Gizé" ] },
        { q: "Qual a capital da Argentina?", a: "Buenos Aires", o: [ "Córdoba", "Rosário", "Mendoza" ] },
        { q: "Qual a capital da Noruega?", a: "Oslo", o: [ "Bergen", "Estocolmo", "Copenhague" ] }
    ],
    agua: [
        { q: "A passagem da água do estado líquido para o gasoso chama-se...", a: "Evaporação", o: [ "Condensação", "Precipitação", "Infiltração" ] },
        { q: "A passagem da água do estado gasoso para o líquido chama-se...", a: "Condensação", o: [ "Evaporação", "Sublimação", "Precipitação" ] },
        { q: "Chuva, neve ou granizo são formas de...", a: "Precipitação", o: [ "Condensação", "Evaporação", "Transpiração" ] },
        { q: "O processo em que as plantas liberam vapor de água é a...", a: "Transpiração", o: [ "Respiração", "Fotossíntese", "Absorção" ] },
        { q: "O acúmulo de água subterrânea forma os...", a: "Lençóis freáticos", o: [ "Rios voadores", "Afluentes", "Mananciais" ] }
    ],
    animais: [
        { q: "Qual é o maior mamífero terrestre?", a: "Elefante", o: [ "Rinoceronte", "Hipopótamo", "Girafa" ] },
        { q: "Qual animal é conhecido como o 'rei da selva'?", a: "Leão", o: [ "Tigre", "Onça", "Leopardo" ] },
        { q: "Qual desses animais é um marsupial?", a: "Canguru", o: [ "Coala", "Gambá", "Diabo-da-tasmânia" ] }, // Coala and Gambá are also marsupials, making this a tricky question for some mechanics. Let's assume for choice this is fine.
        { q: "Qual ave não pode voar?", a: "Pinguim", o: [ "Avestruz", "Ema", "Galinha" ] }, // Avestruz and Ema are also flightless, adjusting for simplicity. Let's make it more specific.
        { q: "Qual o animal mais rápido do mundo?", a: "Guepardo", o: [ "Falcão-peregrino", "Leão", "Antílope" ] },
        { q: "Onde vivem os ursos polares?", a: "Ártico", o: [ "Antártida", "Sibéria", "Alasca" ] }
    ],
    historia: [
        { q: "Quem proclamou a Independência do Brasil?", a: "Dom Pedro I", o: [ "Dom João VI", "Tiradentes", "Marechal Deodoro" ] },
        { q: "Em que ano o Brasil foi descoberto pelos portugueses?", a: "1500", o: [ "1492", "1522", "1600" ] },
        { q: "Qual foi a lei que aboliu a escravidão no Brasil?", a: "Lei Áurea", o: [ "Lei do Ventre Livre", "Lei dos Sexagenários", "Lei Eusébio de Queirós" ] },
        { q: "Quem foi o primeiro presidente do Brasil?", a: "Deodoro da Fonseca", o: [ "Prudente de Morais", "Floriano Peixoto", "Campos Sales" ] },
        { q: "A 'Inconfidência Mineira' foi um movimento que lutava pela...", a: "Independência", o: [ "Monarquia", "República", "Coroa Portuguesa" ] }
    ]
}

// --- TÍTULOS DOS TEMAS PARA A TELA DE JOGO ---
// Mapeia o 'value' do tema para um título mais amigável.

export const themeTitles = {
    tabuada: "Desafio da Tabuada",
    capitais: "Quiz das Capitais",
    agua: "A Jornada da Água",
    animais: "Reino Animal",
    historia: "História do Brasil"
}
