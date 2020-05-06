/* eslint-disable no-unused-vars */
import { EGAMESTATUS, EPIEVESTYPE, EGAMEBTNTYPE } from '../enum';

export interface IGameStatus {
  type: EGAMEBTNTYPE | null;
  turn: EPIEVESTYPE;
  size: EPIEVESTYPE[][];
  prevChose: number;
  histroyChose: number[];
  status: EGAMESTATUS;
  winner: EPIEVESTYPE;
}

export interface ISenceStatus {
  status: EGAMESTATUS;
  winner: EPIEVESTYPE;
}
