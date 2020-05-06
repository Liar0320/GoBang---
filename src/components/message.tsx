import { Component } from 'react';
import * as React from 'react';

import styles from '../assets/contents/message.scss';
import { EGAMESTATUS, EPIEVESTYPE } from '../enum';
// eslint-disable-next-line no-unused-vars
import { ISenceStatus } from '../interface';

interface IMessage {
  title: string;
  text: string;
  show: boolean;
  btn: string[];
  status: EGAMESTATUS;
}

export default class Message extends Component<any, IMessage> {
  name = 'Message';

  public state: IMessage = {
    title: '消息',
    text: '....等待开始游戏',
    btn: null,
    show: ![EGAMESTATUS.GAMEREADY, EGAMESTATUS.GAMESTART].includes(
      this.props.status,
    ),
    status: EGAMESTATUS.GAMEREADY,
  };

  static getDerivedStateFromProps(props: any, state: IMessage) {
    if (props.status !== state.status) {
      const newState: any = {
        status: props.status,
        show: ![EGAMESTATUS.GAMEREADY, EGAMESTATUS.GAMESTART].includes(
          props.status,
        ),
      };
      let msg = null;

      if (props.winner === EPIEVESTYPE.BLACK) {
        msg = '黑色选手胜利';
      } else if (props.winner === EPIEVESTYPE.WHITE) {
        msg = '白色选手胜利';
      } else if (props.status === EGAMESTATUS.GAMEPAUSE) {
        msg = '...等待继续游戏';
      } else {
        msg = '...等待开始游戏';
      }

      if (props.status === EGAMESTATUS.GAMEREADY) {
        newState.btn = null;
      } else {
        newState.btn = ['close'];
      }

      newState.text = msg;

      return newState;
    }

    return null;
  }

  close() {
    this.setState({ show: false });
  }

  public render() {
    let messageStyle = null;

    if (this.state.show) {
      messageStyle = {
        display: 'block',
      };
    } else {
      messageStyle = {
        display: 'none',
      };
    }

    let btnEl: any = null;

    if (this.state.btn) {
      btnEl = this.state.btn.map((item: any): any => {
        if (item === 'close') {
          return (
            <span
              key={item}
              className={styles['msg--close']}
              onClick={this.close.bind(this)}
            >
              ×
            </span>
          );
        }

        return '';
      });
    }

    return (
      <div className={styles['msg--container']} style={messageStyle}>
        <div className={styles['msg--wrap']}>
          <div className={styles['msg--header']}>
            <div className={styles['msg--title']}>{this.state.title}</div>
            {btnEl}
          </div>
          <p className={styles['msg--text']}>{this.state.text}</p>
        </div>
      </div>
    );
  }
}
