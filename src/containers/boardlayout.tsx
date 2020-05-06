import { connect } from 'react-redux';
// import { Dispatch } from 'react';
import Boardlayout from '../components/boardlayout';

import {
  PIECEDOWN,
  PIECEDOWNAI,
  BOARDCLEAR,
  USERPIECECOLORCHOSE,
  // GAMEOVER,
  // GAMEOVER,
} from '../actions';
// import { logicWin } from '../utils';
// eslint-disable-next-line no-unused-vars
import { EPIEVESTYPE } from '../enum';
// eslint-disable-next-line no-unused-vars
import { IStore } from '../store';
// import { validRect } from '../utils';

const mapStateToProps = (store: IStore): any => {
  return {
    ...store.board,
    // status: store.scence.status,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  // eslint-disable-next-line no-unused-vars
  PIECEDOWN: (index: number, user: EPIEVESTYPE, isAi: boolean) => {
    // eslint-disable-next-line no-bitwise

    dispatch(PIECEDOWN(index, user));

    if (isAi) dispatch(PIECEDOWNAI());
    // dispatch(
    //   PIECEDOWN(index, (state: any) => {
    //     // console.log(state);
    //     // eslint-disable-next-line no-bitwise
    //     const row = (index / 15) >> 0;
    //     const col = index % 15;

    //     const isWin = validRect(state, [col, row], user);

    //     if (isWin) {
    //       dispatch(GAMEOVER(user));
    //     }
    //   }),
    // );

    // eslint-disable-next-line no-bitwise
    // const row = (index / 15) >> 0;
    // const col = index % 15;
    // const isWin = logicWin.downChess(col, row, user as any);

    // if (isWin) {
    //   dispatch(GAMEOVER(user));
    // }

    // else {
    //   const compute =
    //     user === EPIEVESTYPE.WHITE ? EPIEVESTYPE.BLACK : EPIEVESTYPE.WHITE;
    //   const nextI: number = logicWin.ai(compute);

    //   // eslint-disable-next-line no-bitwise
    //   row = (nextI / 15) >> 0;
    //   col = nextI % 15;
    //   dispatch(PIECEDOWN(nextI));
    //   // console.log(col, row);
    //   const isCWin = logicWin.downChess(col, row, compute);

    //   if (isCWin) {
    //     dispatch(GAMEOVER(compute));
    //   }
    // }
  },
  BOARDCLEAR: () => dispatch(BOARDCLEAR()),
  USERPIECECOLORCHOSE: () => dispatch(USERPIECECOLORCHOSE()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Boardlayout);
