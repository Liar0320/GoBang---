// eslint-disable-next-line no-unused-vars
import { EACTIONTYPE, EPIEVESTYPE, EGAMEBTNTYPE } from '../enum';

export const PIECEDOWN = (index: number, user: EPIEVESTYPE) => ({
  type: EACTIONTYPE.PIECEDOWN,
  index,
  user,
});

export const PIECEDOWNAI = () => ({
  type: EACTIONTYPE.PIECEDOWNAI,
});

export const USERPIECECOLORCHOSE = () => ({
  type: EACTIONTYPE.USERPIECECOLORCHOSE,
});

export const USERREGRET = () => ({
  type: EACTIONTYPE.USERREGRET,
});

export const BOARDCLEAR = () => ({
  type: EACTIONTYPE.BOARDCLEAR,
});
export const GAMEINIT = () => ({
  type: EACTIONTYPE.INIT,
});

export const GAMESTART = (gameBtnType: EGAMEBTNTYPE) => ({
  type: EACTIONTYPE.GAMESTART,
  gameBtnType,
});

export const GAMEOVER = (user: EPIEVESTYPE) => ({
  type: EACTIONTYPE.GAMEOVER,
  user,
});

export const GAMEPAUSE = () => ({
  type: EACTIONTYPE.GAMEPAUSE,
});
