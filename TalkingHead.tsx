import React, { Component } from 'react';

import VOCABS, { VocabName } from './vocabularies';
import Talker from './talker';

interface Props {
  vocabName: VocabName,
}

interface State {
  talker: Talker,
  output: string,
}

export default class TalkingHead extends Component<Props, State> {
  constructor(props) {
    super(props);

    const talker = new Talker(VOCABS.get(this.props.vocabName));
    this.state = {
      talker,
      output: talker.talk()
    };
  }

  refreshOutput = () => {
    this.setState({
      output: this.state.talker.talk()
    });
  }

  render() {
    const vocabNameString = VocabName[this.props.vocabName];

    return (
      <div>
        <h3>
          <button onClick={this.refreshOutput}>
            Talk {vocabNameString} to me.
          </button>
        </h3>
        <p><i>"{this.state.output}"</i></p>
      </div>
    );
  }
}
