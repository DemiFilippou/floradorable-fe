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
      userPlant: {},
      loading: true,
      showPlant: false
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

  handleClick(userPlant) {
    console.log(userPlant);
    // Use state to overlay the show for this UserPlant
    this.setState({userPlant: userPlant, showPlant: true});
  }

  show() {
    return (
      <div id="showUserPlant">
        <UserPlant
          key = {this.state.userPlant.id}
          nickname = {this.state.userPlant.nickname}
          pot_size = {this.state.userPlant.pot_size}
          water_frequency = {this.state.userPlant.water_frequency}
          image = {this.state.userPlant.image}
          indoors = {this.state.userPlant.indoors}
          last_watered = {this.state.userPlant.last_watered}
        />
        <button className="water"> WATER </button>
    </div>
    )
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
    if (this.state.showPlant) {
      return this.show();
    }
    return (
      <div className="userPlants"> 
        {this.state.userPlants? this.state.userPlants.map(up =>
        <UserPlant
          key = {up.id}
          nickname = {up.nickname}
          pot_size = {up.pot_size}
          water_frequency = {up.water_frequency}
          image = {up.image}
          indoors = {up.indoors}
          last_watered = {up.last_watered}
          handleClick = {this.handleClick.bind(this, up)}
         />
        ) : ''}
      </div>
    );
  }
}
