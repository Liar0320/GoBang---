import { connect } from 'react-redux';
import Message from '../components/message';
// eslint-disable-next-line no-unused-vars
import { IStore } from '../store';

const mapStateToProps = (store: IStore): any => {
  return {
    status: store.board.status,
    winner: store.board.winner,
  };
};

export default connect(mapStateToProps)(Message);
