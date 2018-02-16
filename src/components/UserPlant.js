import React from 'react';
import {plant} from '../images/plant.png';

class UserPlant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <UserPlant className="UserPlant">
        <img src={plant} />
        <div class="UserPlantName">
          this.state.nickname
        </div>
      </UserPlant>
    )
  }
}

export default UserPlant;
