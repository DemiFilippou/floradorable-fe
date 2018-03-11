import React, { Component } from 'react';
import Api from '../api.js';
import UserPlant from '../components/UserPlant.js';
import './Home.css';
import NewPlantForm from './NewPlantForm.js';
import ShowUserPlant from './ShowUserPlant.js';
import RoundButton from '../components/RoundButton.js';
import FirstPlant from '../components/FirstPlant.js';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userPlants: '',
      userPlant: {},
      loading: true,
      showPlant: false,
      addPlant: false
    };
  }

  async componentWillMount() {
    let userPlants;
    try {
      userPlants = await Api.getUserPlants();
    } catch (err) {
      console.log(err);
    }
    this.setState({ userPlants: userPlants, loading: false });
    console.log(this.state);
  }

  handleImageClick(userPlant) {
    console.log(userPlant);
    // Use state to overlay the show for this UserPlant
    this.setState({ userPlant: userPlant, showPlant: true });
  }

  handleBackButton() {
    this.setState({ showPlant: false });
  }

  handleAddClick() {
    this.setState({ addPlant: true });
  }

  logout() {
    localStorage.removeItem('floratoken');
    window.location.reload();
  }

  render() {
    console.log(this.state);
    if (this.state.loading) {
      // TODO: LOADING screen
      return null;
    }
    if (this.state.addPlant) {
      return <Redirect to={{ pathname: '/new' }} />;
    }
    if (this.state.userPlants.length === 0) {
      // Add your first plant screen
      return (
        <div className="Home">
          <RoundButton text="+" onClick={this.handleAddClick.bind(this)} />
          <FirstPlant />
          <button onClick={this.logout} className="logout">
            LOG OUT
          </button>
        </div>
      );
    }
    if (this.state.showPlant) {
      return (
        <ShowUserPlant
          key={this.state.userPlant.id}
          id={this.state.userPlant.id}
          nickname={this.state.userPlant.nickname}
          pot_size={this.state.userPlant.pot_size}
          water_frequency={this.state.userPlant.water_frequency}
          image={this.state.userPlant.image}
          indoors={this.state.userPlant.indoors}
          last_watered={this.state.userPlant.last_watered}
          plant={this.state.userPlant.plant}
          handleBackButton={this.handleBackButton.bind(this)}
        />
      );
    }
    // Go thru the user plants and assign them to the left or right column
    let leftColumn = [];
    let rightColumn = [];
    for (let i = 0; i < this.state.userPlants.length; i++) {
      // Even numbers --> left col
      if (i % 2 == 0) {
        leftColumn.push(this.state.userPlants[i]);
      } else {
        // Odd numbers --> right col
        rightColumn.push(this.state.userPlants[i]);
      }
    }
    return (
      <div className="Home">
        <div className="userPlants">
          <RoundButton text="+" onClick={this.handleAddClick.bind(this)} />
          <div className="leftUserPlants">
            {leftColumn
              ? leftColumn.map((up) => (
                  <UserPlant
                    key={up.id}
                    nickname={up.nickname}
                    pot_size={up.pot_size}
                    water_frequency={up.water_frequency}
                    image={up.image}
                    indoors={up.indoors}
                    last_watered={up.last_watered}
                    plant={up.plant}
                    handleClick={this.handleImageClick.bind(this, up)}
                  />
                ))
              : ''}
          </div>
          <div className="rightUserPlants">
            {rightColumn
              ? rightColumn.map((up) => (
                  <UserPlant
                    key={up.id}
                    nickname={up.nickname}
                    pot_size={up.pot_size}
                    water_frequency={up.water_frequency}
                    image={up.image}
                    indoors={up.indoors}
                    last_watered={up.last_watered}
                    plant={up.plant}
                    handleClick={this.handleImageClick.bind(this, up)}
                  />
                ))
              : ''}
          </div>
        </div>
        <button onClick={this.logout} className="logout">
          LOG OUT
        </button>
      </div>
    );
  }
}

export default Home;
