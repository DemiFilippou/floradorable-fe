import React from 'react';
import Api from '../api.js'
import { Redirect } from 'react-router-dom'
import PlantTypeField from '../components/PlantTypeField.js'
import PotSizeField from '../components/PotSizeField.js'
import IndoorsField from '../components/IndoorsField.js'

class NewPlantForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      plant_type: '',
      pot_size: '',
      indoors: ''
    };
  }

  saveValue(field, value) {
    const newState = {};
    newState[field] = value;
    this.setState(
      newState
    );
  }

  nextStep() {
    this.setState({
      step : this.state.step + 1
    });
  }

  previousStep() {
    this.setState({
      step : this.state.step - 1
    });
  }

  async submit() {
    let addUserPlantSuccess;
    try {
      addUserPlantSuccess = await Api.addUserPlant(this.state.formFields);
    } catch(err) {
      console.log(err);
    }
    if (addUserPlantSuccess) {
      // TODO: check response
      console.log("Added plant");
      this.nextStep();
    }
  }

  render() {
    console.log(this.state);
    switch (this.state.step) { 
      case 1:
        return <PlantTypeField fieldValues={this.state}
          nextStep={this.nextStep.bind(this)}
          saveValue={this.saveValue.bind(this)}/>
      case 2:
        return <PotSizeField fieldValues={this.state}
          nextStep={this.nextStep.bind(this)}
          previousStep={this.previousStep.bind(this)}
          saveValue={this.saveValue.bind(this)}/>
      case 3:
        return <IndoorsField fieldValues={this.state}
          previousStep={this.previousStep.bind(this)}
          submit={this.submit.bind(this)} />
      case 4: // redirect to home page so user can see his/her plant
        return <Redirect to={{pathname: '/'}} />;
    }
  }
}

export default NewPlantForm;
