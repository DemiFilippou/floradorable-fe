import React from 'react';
import Api from '../api.js'
import { Redirect, withRouter } from 'react-router-dom'
import PlantIdField from '../components/PlantIdField.js'
import PotSizeField from '../components/PotSizeField.js'
import IndoorsField from '../components/IndoorsField.js'
import './NewPlantForm.css';
import RoundButton from '../components/RoundButton.js';

class NewPlantForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      plant_id: '',
      pot_size: '',
      indoors: '',
      redirect: false
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

  handleClick() {
    console.log('click');
    this.setState({redirect: true});
  }

  async submit() {
    let addUserPlantSuccess;
    try {
      addUserPlantSuccess = await Api.addUserPlant(this.state);
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
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/'}} />;
    }
    switch (this.state.step) { 
      case 1:
        return (
          <div id="NewPlantForm">
            <RoundButton 
              text="x"
              onClick={this.handleClick.bind(this)}
            />
            <PlantIdField
              fieldValues={this.state}
              nextStep={this.nextStep.bind(this)}
              saveValue={this.saveValue.bind(this)}
            />
          </div>
        )
      case 2:
        return (
          <div id="NewPlantForm">
            <RoundButton
              text="x"
              onClick={this.handleClick.bind(this)}
            />
            <PotSizeField
              fieldValues={this.state}
              nextStep={this.nextStep.bind(this)}
              previousStep={this.previousStep.bind(this)}
              saveValue={this.saveValue.bind(this)}
            />
          </div>
        );
      case 3:
          return (
            <div id="NewPlantForm">
              <RoundButton
                text="x"
                onClick={this.handleClick.bind(this)}
              />
              <IndoorsField
                fieldValues={this.state}
                previousStep={this.previousStep.bind(this)}
                submit={this.submit.bind(this)}
                saveValue={this.saveValue.bind(this)}
              />
            </div>
          );
      case 4: // redirect to home page so user can see his/her plant
        return <Redirect to={{pathname: '/'}} />;
    }
  }
}

export default NewPlantForm;
