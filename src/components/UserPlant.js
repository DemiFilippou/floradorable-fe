import React from 'react';
import plant from '../images/plant.png';
import './UserPlant.css'

class UserPlant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let image = null;
    // if this component is passed handleClick, we know we are rendering
    // the index page and we need the image to be clickable. Otherwise,
    // we are rendering the show page and the image shouldn't be clickable.
    if ('handleClick' in this.props) {
      image = 
        <img
          src={plant}
          onClick={this.props.handleClick}
          className="userPlantImg index"
        />
    } else {
      image =
        <img
          src={plant}
          className="userPlantImg"
        />
    }
    return (
      <div className="userPlant">
        {image}
        <div className="UserPlantName">
          {this.props.nickname}
        </div>
      </div>
    );
  }
}

export default UserPlant;
