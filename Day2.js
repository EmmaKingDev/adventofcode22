import fs from 'fs'

// DAY 2
// Rock Paper Scissors

//Opponent, Player [column 1, column 2] 
// a,x = rock
// b,y = paper
// c,z = scissors

let opponent = []
let player = []
let opponentNewRules = []
let desicion = []

let opponentPoints = 0
let playerPoints = 0

let opponentPointsNewRules = 0
let playerPointsNewRules = 0

function decryptInput(input) {
    if (input === 'A' || input === 'X') {
        return ["rock", 1] // 1 point for every use
    } else if (input === 'B' || input === 'Y') {
        return ["paper", 2] // 2 points for every use
    } else if (input === 'C' || input === 'Z') {
        return ["scissors", 3] // 3 points for every use
    }
}

function decryptNewRules(input) {
    if (input === 'A') {
        return ["rock", 1] // 1 point for every use
    } else if (input === 'B') {
        return ["paper", 2] // 2 points for every use
    } else if (input === 'C') {
        return ["scissors", 3] // 3 points for every use
    } else if (input === 'X') {
        return ["lose"]
    } else if (input === 'Y') {
        return ["draw"]
    } else if (input === 'Z') {
        return ["win"]
    }
}

function winner(opponentScore, playerScore) {
    //initially I had (opponentScore === playerScore) but that was not working
    //realised it was not comparing the values in the array but the arrays themselves, which are not the same
    if (opponentScore[0] === playerScore[0]) {
        opponentPoints += 3 // 3 points for every draw
        playerPoints += 3 // 3 points for every draw
        // both opponentScpre[0] and playerScore[0] are the same, both get points
        if (opponentScore[0] === "rock") {
            opponentPoints += 1
            playerPoints += 1
        }
        if (opponentScore[0] === "paper") {
            opponentPoints += 2
            playerPoints += 2
        }
        if (opponentScore[0] === "scissors") {
            opponentPoints += 3
            playerPoints += 3
        }
    } if (opponentScore[0] === "rock" && playerScore[0] === "paper") {
        playerPoints += 6 // 6 points for every win
        playerPoints += playerScore[1]
        opponentPoints += opponentScore[1]
    } if (opponentScore[0] === "rock" && playerScore[0] === "scissors") {
        opponentPoints += 6 
        opponentPoints += opponentScore[1]
        playerPoints += playerScore[1]
    } if (opponentScore[0] === "paper" && playerScore[0] === "rock") {
        opponentPoints += 6 
        opponentPoints += opponentScore[1]
        playerPoints += playerScore[1]
    } if (opponentScore[0] === "paper" && playerScore[0] === "scissors") {
        playerPoints += 6
        playerPoints += playerScore[1]
        opponentPoints += opponentScore[1]
    } if (opponentScore[0] === "scissors" && playerScore[0] === "rock") {
        playerPoints += 6
        playerPoints += playerScore[1]
        opponentPoints += opponentScore[1]
    } if (opponentScore[0] === "scissors" && playerScore[0] === "paper") {
        opponentPoints += 6
        opponentPoints += opponentScore[1]
        playerPoints += playerScore[1]
    }
}

function game() {
    for (let i = 0; i < opponent.length; i++) {
        winner(opponent[i], player[i])
    }
    console.log("opponent points: " + opponentPoints)
    console.log("player points: " + playerPoints)
}

function gameNewRules() {
    for (let i = 0; i < opponentNewRules.length; i++) {
        newRules(opponentNewRules[i], desicion[i])
    }
    console.log("new rules! opponent points: " + opponentPointsNewRules)
    console.log("new rules! player points: " + playerPointsNewRules)
}

function newRules(opponentNewRules, desicion) {
    if (opponentNewRules[0] === "rock" && desicion[0] === "win") {
        playerPointsNewRules += 6
        playerPointsNewRules += 2 // paper
        opponentPointsNewRules += 1 // rock
    } if (opponentNewRules[0] === "rock" && desicion[0] === "lose") {
        opponentPointsNewRules += 6
        opponentPointsNewRules += 1 // rock
        playerPointsNewRules += 3 // scissors
    } if (opponentNewRules[0] === "rock" && desicion[0] === "draw") {
        opponentPointsNewRules += 4 // 3 for draw + 1 for rock
        playerPointsNewRules += 4
    } if (opponentNewRules[0] === "paper" && desicion[0] === "win") {
        playerPointsNewRules += 6
        playerPointsNewRules += 3 // scissors
        opponentPointsNewRules += 2 // paper
    } if (opponentNewRules[0] === "paper" && desicion[0] === "lose") {
        opponentPointsNewRules += 6
        opponentPointsNewRules += 2 // paper
        playerPointsNewRules += 1 // rock
    } if (opponentNewRules[0] === "paper" && desicion[0] === "draw") {
        opponentPointsNewRules += 5 // 3 for draw + 2 for paper
        playerPointsNewRules += 5
    } if (opponentNewRules[0] === "scissors" && desicion[0] === "win") {
        playerPointsNewRules += 6
        playerPointsNewRules += 1 // rock
        opponentPointsNewRules += 3 // scissors
    } if (opponentNewRules[0] === "scissors" && desicion[0] === "lose") {
        opponentPointsNewRules += 6
        opponentPointsNewRules += 3 // scissors
        playerPointsNewRules += 2 // paper
    } if (opponentNewRules[0] === "scissors" && desicion[0] === "draw") {
        opponentPointsNewRules += 6 // 3 for draw + 3 for scissors
        playerPointsNewRules += 6
    }
}

fs.readFile('./data/day2data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    //separate data by empty line and by comma [A X,\n B Y,\n C Z...]
    const raw = data.split('\n')
    for (let i = 0; i < raw.length; i++) {
        let split = raw[i].split(',')
        opponent.push(decryptInput(split[0][0]))
        // split[0][1] would be an empty string
        player.push(decryptInput(split[0][2]))
        opponentNewRules.push(decryptNewRules(split[0][0]))
        desicion.push(decryptNewRules(split[0][2]))
    }
    game()
    gameNewRules()
})