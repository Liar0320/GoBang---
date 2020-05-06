import { combineReducers } from 'redux';
import boardReducer from './boardStore';
/* eslint-disable no-unused-vars */
import { IGameStatus } from '../interface';
// import gameReducer from './game';

export interface IStore {
  board: IGameStatus;
  // scence: any;
}

export default combineReducers({
  board: boardReducer,
  // scence: gameReducer,
});
