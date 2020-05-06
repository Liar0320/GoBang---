import { Component } from 'react';
import * as React from 'react';
import styles from '../assets/contents/boardlayout.scss';
import { EPIEVESTYPE, EGAMESTATUS, EGAMEBTNTYPE } from '../enum';
// eslint-disable-next-line no-unused-vars
import { IGameStatus } from '../interface';

const initState = {
  active: false,
  show: true,
  maxCell: 225,
  status: EGAMESTATUS.GAMEREADY,
};

function isAi(state: IGameStatus) {
  return state.type === EGAMEBTNTYPE.aiGame;
}

/**
 * Board 棋盘
 * size:来展示棋盘
 * prevChose:上一子落下的位置
 * turn:控制当前是哪一方下棋
 * 没有权利改变任何状态
 */
export default class Board extends Component<any, any> {
  name = 'Board';

  public state = {
    ...initState,
    maxCell: this.props.size.length * this.props.size.length,
  };

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.status !== state.status) {
      const newState: any = {
        status: props.status,
      };

      if ([EGAMESTATUS.GAMESTART].includes(props.status)) {
        newState.active = true;
      } else {
        newState.active = false;
      }

      return newState;
    }

    return null;
  }

  public getPiecesClass(index: number) {
    const className = [styles.pieces];
    // eslint-disable-next-line no-bitwise
    const row = (index / 15) >> 0;
    const col = index % 15;

    const HASHTYPE = {
      [EPIEVESTYPE.WHITE]: styles['pieces--white'],
      [EPIEVESTYPE.BLACK]: styles['pieces--black'],
    };
    const { size } = this.props;
    const type = size[row][col];

    if (type !== undefined) className.push(HASHTYPE[type as EPIEVESTYPE]);
    if (this.props.prevChose === index) className.push(styles['pieces--prev']);
    if (this.props.status !== EGAMESTATUS.GAMESTART)
      className.push(styles.reset__lich);

    return className.join(' ');
  }

  public falldown(index: number) {
    if (!this.state.active) return;
    this.props.PIECEDOWN(index, this.props.turn, isAi(this.props as any));
  }

  public render() {
    // const userBoardStyle = {
    //   display: this.state.active ? 'block' : 'none',
    // };

    return (
      <div data-name={this.name} className={styles.container}>
        <div
          // style={userBoardStyle}
          className={[
            styles['pieces--container'],
            this.props.turn === EPIEVESTYPE.WHITE
              ? styles['turn-white']
              : styles['turn-black'],
          ].join(' ')}
        >
          {new Array(225).fill(null).map((i, index) => (
            <div
              key={index}
              className={this.getPiecesClass.call(this, index)}
              onClick={() => {
                this.falldown(index);
              }}
            ></div>
          ))}
        </div>
        <div className={styles.board}>
          <div className={styles.board__border}>
            {new Array(14).fill(null).map((i, index) => (
              <div
                key={index}
                className={[
                  styles.board__border,
                  styles['board__border--l'],
                ].join(' ')}
              ></div>
            ))}
          </div>
          <div
            className={styles['board__border--inside']}
            data-tag="board__border-v"
          >
            {new Array(14).fill(null).map((i, index) => (
              <div
                key={index}
                className={(styles.board__border, styles['board__border--v'])}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
