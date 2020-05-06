/* eslint-disable no-cond-assign */
/* eslint-disable no-underscore-dangle */
// https://www.jianshu.com/p/83fa8cc31a38
// https://www.imooc.com/video/11635
export const logicWinFnc = () => {
  let chessBoard: any[][] = null;
  /* eslint-disable no-plusplus */
  // 赢法数组
  const wins: any[][] = [];
  // 赢法统数组
  const blackWin: number[] = [];
  const whiteWin: number[] = [];

  let count = 0;

  function init() {
    chessBoard = new Array(15).fill(null).map(() => new Array(15).fill(0));
    for (let i = 0; i < 15; i++) {
      wins[i] = [];
      for (let j = 0; j < 15; j++) {
        wins[i][j] = [];
      }
    }
    count = 0;
    // 行上所有的赢法

    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[i][j + k][count] = true;
        }
        count++;
      }
    }
    // 列上所有的赢法
    for (let i = 0; i < 15; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[j + k][i][count] = true;
        }
        count++;
      }
    }
    // 正对角线上所有的赢法
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j + k][count] = true;
        }
        count++;
      }
    }
    // 反对角线上所有的赢发
    for (let i = 0; i < 11; i++) {
      for (let j = 14; j > 3; j--) {
        for (let k = 0; k < 5; k++) {
          wins[i + k][j - k][count] = true;
        }
        count++;
      }
    }

    for (let i = 0; i < count; i++) {
      blackWin[i] = 0;
      whiteWin[i] = 0;
    }
  }

  function isWin(i: number, j: number, usertype: 'black' | 'white') {
    // let over = false;
    for (let k = 0; k < count; k++) {
      if (wins[i][j][k]) {
        if (usertype === 'black') {
          blackWin[k]++;
          whiteWin[k] += 10;
        } else if (usertype === 'white') {
          whiteWin[k]++;
          blackWin[k] += 10;
        }
      }
      if (usertype === 'black' && blackWin[k] === 5) {
        return true;
      }
      if (usertype === 'white' && whiteWin[k] === 5) {
        return true;
      }
    }

    return false;
  }

  init();

  return {
    downChess(i: number, j: number, usertype: 'black' | 'white') {
      chessBoard[i][j] = usertype;

      return isWin(i, j, usertype);
    },
    regret(i: number, j: number, usertype: 'black' | 'white') {
      chessBoard[i][j] = 0;
      // let over = false;
      for (let k = 0; k < count; k++) {
        if (wins[i][j][k]) {
          if (usertype === 'black') {
            blackWin[k]--;
            whiteWin[k] -= 10;
          } else if (usertype === 'white') {
            whiteWin[k]--;
            blackWin[k] -= 10;
          }
        }
      }
    },
    ai(usertype: 'black' | 'white') {
      const myScore: any[][] = []; // 定义两个数组，用于存放每个点的分值
      const computerScore: number[][] = [];
      let max = 0; // 落子的价值
      let u = 0;
      let v = 0; // 落子的坐标

      for (let i = 0; i < 15; i++) {
        myScore[i] = [];
        computerScore[i] = [];
        for (let j = 0; j < 15; j++) {
          myScore[i][j] = 0;
          computerScore[i][j] = 0;
        }
      }
      let myWin = null;
      let computerWin = null;

      if (usertype === 'black') {
        myWin = whiteWin;
        computerWin = blackWin;
      } else {
        myWin = blackWin;
        computerWin = whiteWin;
      }
      for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
          if (chessBoard[i][j] === 0) {
            for (let k = 0; k < count; k++) {
              if (wins[i][j][k]) {
                // 电脑拦截
                if (myWin[k] === 1) {
                  myScore[i][j] += 200;
                } else if (myWin[k] === 2) {
                  myScore[i][j] += 400;
                } else if (myWin[k] === 3) {
                  myScore[i][j] += 2000;
                } else if (myWin[k] === 4) {
                  myScore[i][j] += 10000;
                }

                // 电脑攻击
                if (computerWin[k] === 1) {
                  computerScore[i][j] += 220;
                } else if (computerWin[k] === 2) {
                  computerScore[i][j] += 420;
                } else if (computerWin[k] === 3) {
                  computerScore[i][j] += 2100;
                } else if (computerWin[k] === 4) {
                  computerScore[i][j] += 20000;
                }
              }
            }
            if (myScore[i][j] > max) {
              max = myScore[i][j];
              u = i;
              v = j;
            } else if (myScore[i][j] === max) {
              if (computerScore[i][j] > computerScore[u][v]) {
                u = i;
                v = j;
              }
            }

            if (computerScore[i][j] > max) {
              max = computerScore[i][j];
              u = i;
              v = j;
            } else if (computerScore[i][j] === max) {
              if (myScore[i][j] > myScore[u][v]) {
                u = i;
                v = j;
              }
            }
          }
        }
      }

      // this.downChess(u, v, usertype);
      // console.log(u, v);
      const result = v * 15 + u;

      return result;
    },
    restart() {
      init();
    },
  };
};

export const logicWin = logicWinFnc();

// 判断五子棋是否结束的算法
// current当前位置，turn当前方，boardLayout当前棋盘布局
// export function validRect(
//   boardLayout: 'black' | 'white'[][],
//   current: [number, number],
//   turn: 'black' | 'white',
// ) {
//   let matchOpreat = [1, 1];
//   let method = 0;
//   // 用for比while应该更好

//   while (++method !== 5) {
//     const count = { forWard: 0, backWard: 0 };
//     let _rows = current[1];
//     let _cols = current[0];

//     switch (
//       method // 五子棋的四种获胜情况
//     ) {
//       case 1:
//         matchOpreat = [1, 0];
//         break; // 1,1 1,2 1,3 1,4 1,5
//       case 2:
//         matchOpreat = [1, 1];
//         break; // 1,1 2,2 3,3 4,4 5,5
//       case 3:
//         matchOpreat = [0, 1];
//         break; // 1,1 2,1 3,1 4,1 5,1
//       case 4:
//         matchOpreat = [-1, 1];
//         break; // 1,5 2,4 3,3 4,2 5,1
//       default:
//         return new Error('计算错误');
//     }
//     // 判断上一行是否存在(rows - matchOpreat[1]>=0)
//     while (
//       _rows - matchOpreat[1] >= 0 &&
//       boardLayout[(_rows -= matchOpreat[1])][(_cols -= matchOpreat[0])] === turn
//     ) {
//       count.forWard++;
//     }
//     [_cols, _rows] = current;
//     // _rows = current[1];
//     // _cols = current[0];
//     // 判断下一行是否存在(rows + matchOpreat[1]<=14)
//     while (
//       _rows + matchOpreat[1] <= 14 &&
//       boardLayout[(_rows += matchOpreat[1])][(_cols += matchOpreat[0])] === turn
//     ) {
//       count.backWard++;
//     }
//     // console.log(count, count.backWard + count.forWard);
//     if (count.backWard + count.forWard >= 4) return true;
//   }

//   return false;
// }
