 import fs from 'fs'

const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

fs.readFile('./data/day3data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    const raw = data.split('\n')
    const a = raw.map((x) => [
        Array.from(x.slice(0, x.length / 2)),
        Array.from(x.slice(x.length / 2, x.length)),
    ])
    .map(([left, right]) => {
        return left.reduce((acc, curr) => {
            if (right.includes(curr)) {
                return alphabets.indexOf(curr) + 1
                }
                return acc
                }, 0)
            })
    .reduce((sum, value) => sum + value, 0)
    console.log(a)
 })