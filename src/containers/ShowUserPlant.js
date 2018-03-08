import React, { Component } from "react";
import Api from '../api.js';
import UserPlant from '../components/UserPlant.js';
import './ShowUserPlant.css';
import RoundButton from '../components/RoundButton.js';

class ShowUserPlant extends Component {
   constructor(props) {
    super(props);

    this.state = {
    };
   }

  handleWaterClick() {
    console.log(`watering plant ${this.props.id}`);
    Api.waterUserPlant(this.props.id)
  }

  render() {
    return (
      <div id="showUserPlant">
        <RoundButton
          text="x"
          onClick={this.props.handleBackButton}
        />
        <UserPlant
          key = {this.props.id}
          id = {this.props.id}
          nickname = {this.props.nickname}
          pot_size = {this.props.pot_size}
          water_frequency = {this.props.water_frequency}
          image = {this.props.image}
          indoors = {this.props.indoors}
          last_watered = {this.props.last_watered}
          plant = {this.props.plant}
          waterClick = {this.handleWaterClick.bind(this)}
        />
      </div>
    )
  }
}

export default ShowUserPlant;

