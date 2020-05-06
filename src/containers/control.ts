import { connect } from 'react-redux';
import Control from '../components/control';

// eslint-disable-next-line no-unused-vars
import {
  GAMESTART,
  GAMEPAUSE,
  BOARDCLEAR,
  GAMEINIT,
  USERREGRET,
} from '../actions';
// eslint-disable-next-line no-unused-vars
import { IStore } from '../store';
// eslint-disable-next-line no-unused-vars
import { EGAMEBTNTYPE } from '../enum';
// import { logicWin } from '../utils';

const mapStateToProps = (store: IStore): any => {
  return {
    status: store.board.status,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  GAMESTART: (gameBtnType: EGAMEBTNTYPE) => {
    // logicWin.restart();
    dispatch(GAMESTART(gameBtnType));
    dispatch(BOARDCLEAR());
  },
  GAMEINIT: () => {
    dispatch(GAMEINIT());
  },
  // @TODO:GAMEOVER: () => {
  // dispatch(GAMEOVER())
  // },
  GAMEPAUSE: () => dispatch(GAMEPAUSE()),
  USERREGRET: () => dispatch(USERREGRET()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Control);
