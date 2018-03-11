import React from 'react';
import Select from 'react-select';
import Api from '../api.js';
import 'react-select/dist/react-select.css';
import plant from '../images/plant.png';
import './PlantIdField.css';

class PlantIdField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  saveAndContinue(e) {
    e.preventDefault();
    if (this.state.value !== '') {
      this.props.saveValue('plant_id', this.state.value.id);
      this.props.nextStep();
    }
    //TODO: else: render error msg
  }

  onChange(value) {
    this.setState({
      value: value,
    });
    console.log(value);
  }

  getPlants(input) {
    if (!input) {
      return Promise.resolve({options: []});
    }

    return Api.searchPlants(input).then(json => {
      console.log({options: json});
      return {options: json};
    });
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>What kind of plant is it?</h3>
        <img className="plant-img" src={plant} />
        <Select.Async
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          valueKey="id"
          labelKey="name"
          loadOptions={this.getPlants}
        />
        <button onClick={this.saveAndContinue.bind(this)}>NEXT</button>
      </div>
    );
  }
}

export default PlantIdField;
