/* eslint-disable no-unused-vars */
export enum EACTIONTYPE {
  /** 初始化 */
  INIT = 'INIT',
  /** 清理棋盘 */
  BOARDCLEAR = 'BOARDCLEAR',
  /** 棋子落下 */
  PIECEDOWN = 'PIECEDOWN',
  /** AI棋子落下 */
  PIECEDOWNAI = 'PIECEDOWNAI',
  /** 用户选择棋子颜色 */
  USERPIECECOLORCHOSE = 'USERPIECECOLORCHOSE',
  /** 用户悔棋 */
  USERREGRET = 'USERREGRET',
  /** 用户认输 */
  USERGIVEUP = 'USERGIVEUP',
  /** 开始游戏 */
  GAMESTART = 'GAMESTART',
  /** 游戏结束 */
  GAMEOVER = 'GAMEOVER',
  /** 游戏暂停 */
  GAMEPAUSE = 'GAMEPAUSE',
}
export enum EGAMESTATUS {
  GAMEREADY,
  GAMESTART,
  GAMEPAUSE,
  GAMEOVER,
}
export enum EGAMEBTNTYPE {
  dbGame = '双人游戏',
  snGame = '联网对战',
  aiGame = '人机对战',
  regret = '悔棋',
  restart = '重新开始',
  exit = '退出',
}
export enum EPIEVESTYPE {
  WHITE = 'white',
  BLACK = 'black',
}
