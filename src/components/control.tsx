import { Component } from 'react';
import * as React from 'react';

import styles from '../assets/contents/control.scss';
// eslint-disable-next-line no-unused-vars
import { ISenceStatus } from '../interface';
// eslint-disable-next-line no-unused-vars
import { EGAMEBTNTYPE, EGAMESTATUS } from '../enum';

interface IControl {
  btnCollection: EGAMEBTNTYPE[];
  show: boolean;
  status: EGAMESTATUS;
}

export const initState = {
  btnCollection: [
    EGAMEBTNTYPE.aiGame,
    EGAMEBTNTYPE.dbGame,
    // EGAMEBTNTYPE.snGame,
  ],
  show: true,
  status: EGAMESTATUS.GAMESTART,
};

export default class Control extends Component<any, IControl> {
  name = 'Control';

  public state = initState;

  static getDerivedStateFromProps(props: ISenceStatus, state: IControl) {
    if (props.status !== state.status) {
      const newState: any = {
        status: props.status,
      };

      if (
        [EGAMESTATUS.GAMEREADY, EGAMESTATUS.GAMEOVER].includes(props.status)
      ) {
        newState.btnCollection = [...initState.btnCollection];
        if (EGAMESTATUS.GAMEOVER === props.status)
          newState.btnCollection.push(EGAMEBTNTYPE.exit);
      } else {
        newState.btnCollection = [
          EGAMEBTNTYPE.exit,
          EGAMEBTNTYPE.regret,
          // EGAMEBTNTYPE.restart,
        ];
      }

      return newState;
    }

    return null;
  }

  onClick(type: EGAMEBTNTYPE) {
    switch (type) {
      case EGAMEBTNTYPE.dbGame:
        this.props.GAMESTART(EGAMEBTNTYPE.dbGame);
        break;
      case EGAMEBTNTYPE.aiGame:
        this.props.GAMESTART(EGAMEBTNTYPE.aiGame);
        break;
      case EGAMEBTNTYPE.exit:
        this.props.GAMEINIT();
        break;
      case EGAMEBTNTYPE.regret:
        this.props.USERREGRET();
        break;
      default:
        // eslint-disable-next-line no-alert
        window.alert('暂未开放');
        break;
    }
    // console.log(type);
  }

  /**
   * render
   */
  public render() {
    const buttonCollection = this.state.btnCollection.map(item => {
      return (
        <button
          key={item}
          className={[styles.btn, styles['btn--stripe']].join(' ')}
          onClick={this.onClick.bind(this, item)}
        >
          {item}
        </button>
      );
    });

    return (
      <div data-name={this.name} style={{ textAlign: 'center' }}>
        {buttonCollection}
      </div>
    );
  }
}
