import React from 'react';
import plant from '../images/plant.png';
import ReactDOM from 'react-dom';

class PlantTypeField extends React.Component {
  constructor(props) {
    super(props);
  }

  saveAndContinue(e) {
    e.preventDefault()

    // Get values via this.refs
    let plant_type = ReactDOM.findDOMNode(this.refs.plant_type).value;
    this.props.saveValue("plant_type", plant_type);
    this.props.nextStep();
  }

  render() {
    return (
      <div className="PlantType">
        <h3>What kind of plant is it?</h3>
        <img src={plant} />
        <input type="text"
          ref="plant_type"
          placeholder="Search plants" />
        <button onClick={ this.saveAndContinue.bind(this) }>NEXT</button>
      </div>
    )
  }
}

export default PlantTypeField;
