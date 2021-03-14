const sudokuline = '..2.3...8.....8....31.2.....6..5.27..1.....5.2.4.6..31....8.6.5.......13..531.4..'
let sudoku = sudokuline.split('')
let result =sudoku.map((data)=>{
    if (data!='.') {
        return parseInt(data)
    }else{
        return 0
    }
})
console.time('end')
result=result.reduce((all,one,i) => {
    const ch = Math.floor(i/9); 
    all[ch] = [].concat((all[ch]||[]),one); 
    return all
 }, [])

let SudokuMap = result

function IsSolved(InputMap) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (InputMap[i][j] == 0) {
                return false
            }
        }
    }
    return true
}
function FindIndexs(InputMap) {
    const BlankIndex = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (InputMap[i][j] === 0) {
                BlankIndex.push([i, j])
            }
        }
    }
    return BlankIndex
}
function CanInsert(xoy, number) {
    let result = true
    for (let i = 0; i < 9; i++) {
        if (SudokuMap[i][xoy[1]] == number || SudokuMap[xoy[0]][i] == number) {
            result = false;
        }
    }
    const x_Start = parseInt(xoy[0] / 3) * 3
    const Y_Start = parseInt(xoy[1] / 3) * 3
    for (let squreX = x_Start; squreX < x_Start + 3; squreX++) {
        for (let squreY = Y_Start; squreY < Y_Start + 3; squreY++) {
            if (SudokuMap[squreX][squreY] == number) {
                result = false;
            }
        }
    }
    return result
}

const BlankIndex = FindIndexs(SudokuMap)
let count = 0
while (count < BlankIndex.length) {
    if (count < 0) {
        console.log('-------------no solution-------------');
        break;
    }
    let BackTrack = true;
    for (let number = 1 + (SudokuMap[(BlankIndex[count][0])][(BlankIndex[count][1])]); number <= 9; number++) {
        if (CanInsert(BlankIndex[count], number)) {
            SudokuMap[BlankIndex[count][0]][BlankIndex[count][1]] = number
            count += 1
            BackTrack = false
            break;
        }
    }
    if (BackTrack) {
        SudokuMap[(BlankIndex[count][0])][(BlankIndex[count][1])] = 0
        count -= 1
        if (count == 0) {
            for (let index = 1; index < BlankIndex.length; index++) {
                SudokuMap[BlankIndex[index][0]][BlankIndex[index][1]] = 0
            }
        }
    }

}

SudokuMap.map((data) => {
    console.log(data.join('|'));
})
console.timeEnd('end')