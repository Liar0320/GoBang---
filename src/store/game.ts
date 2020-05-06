// /* eslint-disable no-unused-vars */
// import { EACTIONTYPE, EPIEVESTYPE, EGAMESTATUS } from '../enum';
// import { ISenceStatus } from '../interface';
// import { logicWin } from '../utils';

// interface Iaction {
//   type: EACTIONTYPE;
//   user: EPIEVESTYPE;
// }

// const initialState: ISenceStatus = {
//   status: EGAMESTATUS.GAMEREADY,
//   winner: null,
// };

// export default function gameReducer(
//   state: ISenceStatus = initialState,
//   action: Iaction,
// ) {
//   switch (action.type) {
//     case EACTIONTYPE.INIT:
//       logicWin.restart();

//       return { ...initialState };
//     case EACTIONTYPE.GAMESTART:
//       logicWin.restart();

//       return { ...state, status: EGAMESTATUS.GAMESTART };
//     case EACTIONTYPE.GAMEOVER:
//       return { ...state, winner: action.user, status: EGAMESTATUS.GAMEOVER };
//     default:
//       return state;
//   }
// }
