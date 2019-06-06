import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

import { VocabName } from './vocabularies';
import TalkingHead from './TalkingHead';

interface AppProps { }
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <div>
          <TalkingHead vocabName={VocabName.biz} />
        </div>

        <div>
          <TalkingHead vocabName={VocabName.shakespeare} />
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
