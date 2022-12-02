import fs from 'fs'

// DAY 2
// Rock Paper Scissors

//Opponent, Player [column 1, column 2] 
// a,x = rock
// b,y = paper
// c,z = scissors

let opponent = []
let player = []

let opponentPoints = 0
let playerPoints = 0

function decryptInput(input) {
    if (input === 'A' || input === 'X') {
        return ["rock", 1] // 1 point for every use
    } else if (input === 'B' || input === 'Y') {
        return ["paper", 2] // 2 points for every use
    } else if (input === 'C' || input === 'Z') {
        return ["scissors", 3] // 3 points for every use
    }
}

function winner(opponentScore, playerScore) {
    if (opponentScore === playerScore) {
        opponentPoints += 3 // 3 points for every draw
        playerPoints += 3 // 3 points for every draw
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
    }
    game()
})