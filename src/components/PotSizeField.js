import React from 'react';
import pot from '../images/pot.png';
import ReactDOM from 'react-dom';
import './PotSizeField.css'

class PotSizeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pot_sizes: ['xs', 'small', 'medium', 'large'],
      pot_size: ''
    }
  }

  updatePotSize(size) {
    this.setState({
      pot_size: size
    });
  }

  saveAndContinue(e) {
    e.preventDefault();
    this.props.saveValue("pot_size", this.state.pot_size);
    this.props.nextStep();
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>How big is your pot?</h3>
        <div className="pots">
          {this.state.pot_sizes.map(size =>
          <img
            src={pot}
            className={'pot' + (this.state.pot_size == size ? ' chosenSize' : '')}
            onClick={this.updatePotSize.bind(this, size)}
          />
        )}
        </div>
        <button onClick={ this.saveAndContinue.bind(this) }>NEXT</button>
      </div>
    )
  }
}

export default PotSizeField;

