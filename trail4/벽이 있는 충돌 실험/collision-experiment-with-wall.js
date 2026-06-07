const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

let idx = 0;
// const dirCharMap4 = { 'U': [-1, 0], 'R': [0, 1], 'D': [1, 0], 'L': [0, -1] }
const charMap = { 'U': 0, 'R': 1, 'D': 2, 'L': 3 }
const dir4 = [[-1, 0], [0, 1], [1, 0], [0, -1]]

const inRange = (x, y, size) => 1 <= x && x <= size && 1 <= y && y <= size

const t = Number(input[idx++]);

for (let i = 0; i < t; i++) {
    const [n, m] = input[idx++].split(' ').map(Number);
    const marbles = [];
    for (let j = 0; j < m; j++) {
        let [x, y, d] = input[idx++].split(' ');
        marbles.push([Number(x), Number(y), charMap[d]]);
    }
    let grid = Array(n + 1).fill().map(() => Array(n + 1).fill(0))
    // let nextGrid = Array(n + 1).fill().map(() => Array(n + 1).fill(0))

    // for (let i = 0; i < grid.length; i++) grid[i] = Array(n + 1).fill(0)
    // for (let i = 0; i < newGrid.length; i++) newGrid[i] = Array(n + 1).fill(0)


    // 방향 문자 -> 숫자변환해서 좌표방향배열에 다시 넣기
    // marbles = marbles.map(([x, y, d]) => nextMarbles.push(x, y, charMap[d]))
    // let nextMarbles = marbles.map(([x, y, d]) => [x, y, charMap[d]])

    let nextMarbles = marbles;
    // let sec = n * n * 2 //아주 오랜시간이 흐른 후
    let sec = n * 2 //아주 오랜시간이 흐른 후
    while (sec--) {
        // nextMarbles.forEach(([x, y, d]) => {
        nextMarbles = nextMarbles.map(([x, y, d]) => {
            // let [nx, ny] = [x + dirCharMap4[d][0], y + dirCharMap4[d][1]]
            let [nx, ny] = [x + dir4[d][0], y + dir4[d][1]]
            if (!inRange(nx, ny, n)) {
                d = (d + 2) % 4;
                [nx, ny] = [x, y] // 방향만 바꾼다

            }
            // if-else 구조는 구슬 순서대로 처리되므로 먼저 들어간 구슬이 살아남는 문제 -> 2단계로 분리 -> 일괄처리
            // else {
            grid[nx][ny] += 1
            return [nx, ny, d]
        })
        nextMarbles = nextMarbles.filter(Boolean).filter(([x, y, _]) => grid[x][y] === 1)
        grid = Array(n + 1).fill().map(() => Array(n + 1).fill(0))
    }


    // 2D에 있는 1의 개수
    // console.log(grid.flat().filter(e => e > 0).length)
    console.log(nextMarbles.length)
}