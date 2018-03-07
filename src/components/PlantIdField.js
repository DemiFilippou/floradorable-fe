import React from 'react';
import plant from '../images/plant.png';
import Async from 'react-select';
import 'react-select/dist/react-select.css';
import ReactDOM from 'react-dom';
import './PlantIdField.css'
import Api from '../api.js'

class PlantIdField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

    this.handleChange.bind(this);
    //this.getPlants.bind(this);
  }

  saveAndContinue(e) {
    e.preventDefault()

    this.props.saveValue("plant_id", this.state.value);
    this.props.nextStep();
  }

  componentDidMount() {
    //this.refs.plant_id.focus();
  }

  handleChange(value) {
    // Get values via this.refs
    this.setState({value: value});
    console.log(`Selected: ${this.state}`);
  }

  /*
  async getPlants(query) {
    let plants;
    try {
      plants = await Api.searchPlants(query);
    } catch(err) {
      console.log(err);
    }
    if (plants) {
    return { options: plants };
    }
  }
  */
  
  getPlants(query) {
    console.log("time to query for plants");
    if (!query) {
			return Promise.resolve({ options: [] });
		}
    return Api.searchPlants(query)
      .then((json) => {
        return { options: json.items };
      });
  }

  render() {
    return (
      <div className="FieldContainer">
        <h3>What kind of plant is it?</h3>
        <img className="plant-img" src={plant} />
        <Async
          placeholder="Search plants"
          name="plant_id"
          valueKey="id"
          labelKey="name"
          value={this.state.value}
          onChange={this.handleChange}
          loadOptions={this.getPlants} 
        />
        <button onClick={ this.saveAndContinue.bind(this) }>NEXT</button>
      </div>
    )
  }
}

export default PlantIdField;
