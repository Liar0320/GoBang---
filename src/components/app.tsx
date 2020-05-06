import * as React from 'react';
import Boardlayout from '../containers/boardlayout';
import Control from '../containers/control';
import Message from '../containers/message';

const App = () => {
  return (
    <div>
      <Message />
      <Boardlayout />
      <Control />
    </div>
  );
};

export default App;
