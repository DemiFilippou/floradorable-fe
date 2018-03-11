import React from 'react';
import './RoundButton.css';

class RoundButton extends React.Component {
  render() {
    return (
      <div id="RoundButton">
        <button id="roundButton" onClick={this.props.onClick}>{this.props.text}</button>
      </div>
    )
  }
}

export default RoundButton;


