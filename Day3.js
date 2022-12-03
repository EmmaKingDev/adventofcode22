 import fs from 'fs'

const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

fs.readFile('./data/day3data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const raw = data.split('\n')
    const a = raw.map((x) => [
        Array.from(x.slice(0, x.length / 2)), // first half of the string
        Array.from(x.slice(x.length / 2)) // second half of the string
    ])
    .map(([left, right]) => { //fx. [0 0 30 0 0 0 30]
        return left.map((letter) => {
            if (right.includes(letter)) {
                return alphabets.indexOf(letter) + 1
            } else {
                return 0
            }
        })
    })
    .map((repeatingNumb) => Math.max(...repeatingNumb)) //
    .reduce((sum, value) => sum + value, 0)
    //other option
    // .map(([left, right]) => {
    //     return left.reduce((acc, curr) => {
    //         if (right.includes(curr)) {
    //             return alphabets.indexOf(curr) + 1
    //             }
    //             return acc
    //             }, 0)
    //         })
    // .reduce((sum, value) => sum + value, 0)
    console.log(a)

 })