import React, { Component } from "react";
import Api from '../api.js';
import UserPlant from '../components/UserPlant.js';
import './ShowUserPlant.css';

class ShowUserPlant extends Component {
   constructor(props) {
    super(props);

    this.state = {
    };
   }

  render() {
    return (
      <div id="showUserPlant">
        <button className="back" onClick={this.props.handleBackButton}> BACK </button>
        <UserPlant
          key = {this.props.id}
          nickname = {this.props.nickname}
          pot_size = {this.props.pot_size}
          water_frequency = {this.props.water_frequency}
          image = {this.props.image}
          indoors = {this.props.indoors}
          last_watered = {this.props.last_watered}
        />
        <button className="water"> WATER </button>
      </div>
    )
  }
}

export default ShowUserPlant;

