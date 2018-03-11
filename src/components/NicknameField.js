import React from 'react';
import pot from '../images/pot.png';
import ReactDOM from 'react-dom';
import './PotSizeField.css';

class NicknameField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickanme: ''
    };
  }

  updateNickname(e) {
    this.setState({
      nickname: e.target.value
    });
    console.log(e.target.value);
  }

  saveAndContinue(e) {
    e.preventDefault();
    if (this.state.nickname !== '') {
      this.props.saveValue('nickname', this.state.nickname);
      this.props.nextStep();
    }
    // TODO: else --> error
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>Name your plant!</h3>
        <div className="nickname">
          <input onChange={this.updateNickname.bind(this)} />
        </div>
        <button onClick={this.saveAndContinue.bind(this)}>NEXT</button>
      </div>
    );
  }
}

export default NicknameField;
