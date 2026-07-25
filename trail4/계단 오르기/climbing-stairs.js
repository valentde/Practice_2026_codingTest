/*

   - dp[?] 의미: 경우의수
   - 점화식:
   - 초기값: 1차원 값 0
   - 순회 방향/순서: 정방향


*/


const fs = require("fs");
const input = fs.readFileSync(0).toString().trim().split('\n');

const n = Number(input[0]);

// Please Write your code here.

let dp = Array(n + 1).fill(0)
// dp[0] = 1
dp[2] = dp[3] = 1

for(let i=4; i<n + 1; i++)
    dp[i] = ( dp[i - 2] + dp[i - 3] ) % 10007

console.log(dp[n] % 10007)