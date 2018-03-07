import React, { Component } from "react";
import Api from '../api.js';
import UserPlant from '../components/UserPlant.js';
import './Home.css';
import NewPlantForm from './NewPlantForm.js';

export default class Home extends Component {
   constructor(props) {
    super(props);

    this.state = {
      userPlants: '',
      loading: true
    };
   }

  async componentWillMount() {
    let userPlants; 
    try {
      userPlants = await Api.getUserPlants();
    } catch(err) {
      console.log(err);
    }
    this.setState({ userPlants: userPlants, loading: false });
    console.log(this.state);
  }

  render() {
    console.log(this.state);
    if (this.state.loading) {
      // TODO: LOADING screen 
      return null
    }
    if (this.state.userPlants.length === 0) {
      // Add your first plant screen
      console.log("This user has no plants, let's make one!")
      return (
        <NewPlantForm />
      )
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
