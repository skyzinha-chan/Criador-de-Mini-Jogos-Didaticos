// Centraliza todos os dados de conteúdo do projeto para fácil manutenção.

// --- DADOS PARA A TELA DE CONFIGURAÇÃO ---

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
            { value: 'agua', text: 'Ciclo da Água' }
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


// --- DADOS PARA A TELA DO JOGO ---

export const questions = {
    tabuada: [
        { q: "7 x 8?", a: "56", o: [ "49", "54", "63" ] },
        { q: "6 x 9?", a: "54", o: [ "56", "48", "63" ] },
        { q: "12 x 5?", a: "60", o: [ "50", "65", "70" ] },
        { q: "9 x 9?", a: "81", o: [ "72", "89", "91" ] }
    ],
    capitais: [
        { q: "Capital do Japão?", a: "Tóquio", o: [ "Pequim", "Seul", "Bangkok" ] },
        { q: "Capital da Austrália?", a: "Camberra", o: [ "Sydney", "Melbourne", "Perth" ] },
        { q: "Capital do Canadá?", a: "Ottawa", o: [ "Toronto", "Vancouver", "Montreal" ] },
        { q: "Capital da Suíça?", a: "Berna", o: [ "Zurique", "Genebra", "Basileia" ] }
    ],
    agua: [
        { q: "Água vira vapor em qual processo?", a: "Evaporação", o: [ "Condensação", "Precipitação", "Infiltração" ] },
        { q: "Vapor vira líquido em qual processo?", a: "Condensação", o: [ "Evaporação", "Sublimação", "Precipitação" ] },
        { q: "Chuva, neve ou granizo são formas de...", a: "Precipitação", o: [ "Condensação", "Evaporação", "Transpiração" ] }
    ]
}

export const themeTitles = {
    tabuada: "Desafio da Tabuada",
    capitais: "Quiz das Capitais",
    agua: "Ciclo da Água"
}

