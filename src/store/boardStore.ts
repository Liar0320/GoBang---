/* eslint-disable no-bitwise */
/* eslint-disable no-case-declarations */
// eslint-disable-next-line no-unused-vars
import { EACTIONTYPE, EPIEVESTYPE, EGAMESTATUS, EGAMEBTNTYPE } from '../enum';
// eslint-disable-next-line no-unused-vars
import { IGameStatus } from '../interface';
import { logicWinFnc } from '../utils';

interface Iaction {
  index: number;
  user: EPIEVESTYPE;
  type: EACTIONTYPE;
  gameBtnType: EGAMEBTNTYPE;
}
const emptySize = new Array(15).fill(null).map(() => new Array(15).fill(null));
const initialState: IGameStatus = {
  type: null,
  size: [
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
    [
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
      'white',
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
    ],
    [
      'black',
      'white',
      'white',
      'white',
      'white',
      'white',
      'black',
      'white',
      'black',
      'white',
      'white',
      'white',
      'white',
      'white',
      'black',
    ],
    [
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
      'white',
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
      'white',
      'white',
      'black',
      'white',
    ],
    [
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
      'white',
      'white',
      'black',
      'black',
      'black',
      'black',
      'black',
      'white',
    ],
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
    [
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
      'white',
    ],
  ] as any,
  turn: EPIEVESTYPE.BLACK,
  prevChose: null,
  histroyChose: [],
  status: EGAMESTATUS.GAMEREADY,
  winner: null,
};

/** 抽象的逻辑棋盘  用于 判断输赢 ， ai落子  之后可以优化舍去只采用 IGameStatus中的棋盘 */
const abstractChess = logicWinFnc();

/** 交换落子颜色 */
function changeTurn(state: IGameStatus) {
  if (state.turn === EPIEVESTYPE.WHITE) {
    // eslint-disable-next-line no-param-reassign
    state.turn = EPIEVESTYPE.BLACK;
  } else {
    // eslint-disable-next-line no-param-reassign
    state.turn = EPIEVESTYPE.WHITE;
  }

  return JSON.parse(JSON.stringify(state));
}

/**
 * 落子
 * @param index 落子的序号
 * @param state 状态机
 */
function PIECEDOWN(index: number, state: IGameStatus): IGameStatus {
  // eslint-disable-next-line no-bitwise
  const row = (index / 15) >> 0;
  const col = index % 15;
  const { size } = state;

  if (size[row][col]) return;
  size[row][col] = state.turn;
  // eslint-disable-next-line no-param-reassign
  state = changeTurn(state);
  state.histroyChose.push(index);
  // eslint-disable-next-line no-param-reassign
  state.prevChose = index;

  // eslint-disable-next-line consistent-return
  return JSON.parse(JSON.stringify(state));
}

/**
 * AI落子
 * @param state
 * @returns {number} 返回一个 落子的序号
 */
function PIECEDOWNAI(state: IGameStatus): number {
  return abstractChess.ai(state.turn);
}

/**
 * 工具方法用于 ai悔棋 获取前一轮的 落子的棋子颜色
 * @param userType
 * @param index
 */
function changeTurnNormal(userType: EPIEVESTYPE, index: number) {
  if (userType === EPIEVESTYPE.WHITE) {
    return index === 0 ? EPIEVESTYPE.BLACK : EPIEVESTYPE.WHITE;
  }
  if (userType === EPIEVESTYPE.BLACK) {
    return index === 0 ? EPIEVESTYPE.WHITE : EPIEVESTYPE.BLACK;
  }

  return null;
}

/**
 * 悔棋
 * @param state
 */
function regret(state: IGameStatus): IGameStatus {
  let i = 0;

  while (i < 2) {
    const index = state.histroyChose.pop();
    // eslint-disable-next-line no-bitwise
    const row = (index / 15) >> 0;
    const col = index % 15;
    const { size } = state;

    size[row][col] = null;
    // eslint-disable-next-line no-param-reassign
    state.prevChose = state.histroyChose[state.histroyChose.length - 1];

    abstractChess.regret(col, row, changeTurnNormal(state.turn, i));

    // eslint-disable-next-line no-plusplus
    i++;
  }

  return { ...state };
}

/**
 * 是否获胜
 * @param index 落子的序号
 * @param user 棋子颜色
 * @param state 状态机
 */
function dealWin(
  index: number,
  user: EPIEVESTYPE,
  state: IGameStatus,
): IGameStatus {
  // eslint-disable-next-line no-bitwise
  const row = (index / 15) >> 0;
  const col = index % 15;

  // const result = validRect(state.size as any, [col, row], user);
  const result = abstractChess.downChess(col, row, user);

  if (result) {
    return { ...state, status: EGAMESTATUS.GAMEOVER, winner: user };
  }

  return state;
}

export default function boardReducer(
  state: IGameStatus = JSON.parse(JSON.stringify(initialState)),
  action: Iaction,
) {
  switch (action.type) {
    // case EACTIONTYPE.INIT:

    //   return { ...initialState };
    case EACTIONTYPE.INIT:
      return { ...initialState };
    case EACTIONTYPE.GAMESTART:
      abstractChess.restart();

      return {
        ...initialState,
        size: emptySize,
        type: action.gameBtnType || initialState.type,
        status: EGAMESTATUS.GAMESTART,
      };
    case EACTIONTYPE.GAMEOVER:
      return { ...state, winner: action.user, status: EGAMESTATUS.GAMEOVER };
    case EACTIONTYPE.USERREGRET:
      // // #region 逻辑棋盘悔棋
      // const row = (state.prevChose / 15) >> 0;
      // const col = state.prevChose % 15;

      // logicWin.regret(row, col);

      // // #endregion
      return regret(state);
    case EACTIONTYPE.PIECEDOWN:
      const newState = PIECEDOWN(
        action.index,
        JSON.parse(JSON.stringify(state)),
      );

      return dealWin(action.index, action.user, newState);
    case EACTIONTYPE.PIECEDOWNAI:
      const user = state.turn;
      const index = PIECEDOWNAI(JSON.parse(JSON.stringify(state)));
      const ddd = PIECEDOWN(index, JSON.parse(JSON.stringify(state)));

      return dealWin(index, user, ddd);
    // case EACTIONTYPE.BOARDCLEAR:
    //   return { ...initialState };
    case EACTIONTYPE.USERPIECECOLORCHOSE:
      return changeTurn(state);
    default:
      return state;
  }
}

// [
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
//   ['white', 'black','black','black', 'black', 'black', 'white', 'white', 'white', 'black','black','black', 'black', 'black', 'white'],
//   ['black', 'white', 'white', 'white', 'white', 'white', 'black', 'white', 'black', 'white', 'white', 'white', 'white', 'white', 'black'],
//   ['white', 'black','black','black', 'black', 'black', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'black', 'white'],
//   ['white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white'],
//   ['white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white'],
//   ['white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white'],
//   ['white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white'],
//   ['white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white', 'white', 'white', 'black', 'white'],
//   ['white', 'black', 'black', 'black', 'black', 'black', 'white', 'white', 'white', 'black', 'black', 'black', 'black', 'black', 'white'],
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
//   ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
// ];
