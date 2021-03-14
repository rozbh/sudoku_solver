let SudokuMap = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

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
    console.log(xoy);
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
console.log(BlankIndex.length);
let count = 0


while (count < BlankIndex.length) {
    if (count < 0) {
        console.log('ridi');
    }
    let BackTrack = true;
    for (let number = 1 + (SudokuMap[(BlankIndex[count][0])][(BlankIndex[count][1])]); number <= 9; number++) {
        console.log(count);
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

console.log(SudokuMap);