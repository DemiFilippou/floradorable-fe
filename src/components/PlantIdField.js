import React from 'react';
import plant from '../images/plant.png';
import ReactDOM from 'react-dom';
import './PlantIdField.css'

class PlantIdField extends React.Component {
  constructor(props) {
    super(props);
  }

  saveAndContinue(e) {
    e.preventDefault()

    // Get values via this.refs
    let plant_id = ReactDOM.findDOMNode(this.refs.plant_id).value;
    this.props.saveValue("plant_id", plant_id);
    this.props.nextStep();
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>What kind of plant is it?</h3>
        <img className="plant-img" src={plant} />
        <input type="text"
          ref="plant_id"
          placeholder="Search plants"
          autofocus />
        <button onClick={ this.saveAndContinue.bind(this) }>NEXT</button>
      </div>
    )
  }
}

export default PlantIdField;
