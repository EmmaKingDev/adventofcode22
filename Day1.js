import fs from 'fs'

//globals
let all = []
let sums = []
let sorted = []

// DAY 1

//values are separated by a new line, groups of values are separated by an empty line
//find the max sum of each group and sum of top 3 sums
fs.readFile('./data/day1data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    //separate data by empty line
    const raw = data.split('\n\n')
    // replace the newline character with space and push to array 'all'
    for (let i = 0; i < raw.length; i++) {
        let clean = raw[i].replace(/[\r\n]/gm, ' ')
        let split = clean.split(' ')
        all.push(split)
    }
    //find the max sum of each group and push to array 'sums'
    for (let i = 0; i < all.length; i++) {
        let sum = 0
        for (let j = 0; j < all[i].length; j++) {
            sum += parseInt(all[i][j])
        }
        sums.push(sum)
    }
    console.log("sum of max calories by top elf:")
    console.log(Math.max(...sums))
    //sort the array 'sums' in descending order
    sorted.push((sums.sort((a, b) => b - a)))
    let max3 = 0
    for (let i = 0; i < 3; i++) {
        max3 += sorted[0][i]
    }
    console.log("sum of the sums of max calories by top three elfs:")
    console.log(max3)
})