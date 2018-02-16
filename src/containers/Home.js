import React, { Component } from "react";
import Api from '../api.js';
import UserPlant from '../components/UserPlant.js';
import './Home.css';
import { Redirect } from 'react-router-dom'
export default class Home extends Component {
   constructor(props) {
    super(props);

    this.state = {
      userPlants: ''
    };
   }

  async componentWillMount() {
    let userPlants; 
    try {
      userPlants = await Api.getUserPlants();
    } catch(err) {
      console.log(err);
    }
    this.setState({ userPlants: userPlants });
  }

  render() {
    if (!localStorage.floratoken) {
      return <Redirect to={{pathname: '/login'}} />;
    }
    return (
      <div id="userPlants"> 
        {this.state.userPlants? this.state.userPlants.map(up =>
        <UserPlant
          key = {up.id}
          nickname = {up.nickname}
          pot_size = {up.pot_size}
          water_frequency = {up.water_frequency}
          image = {up.image}
          indoors = {up.indoors}
          />
        ) : ''}
      </div>
    );
  }
}
