// Centraliza todos os dados de conteúdo do jogo para fácil manutenção.

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
