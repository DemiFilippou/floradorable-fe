import React from 'react';
import {plant} from '../images/plant.png';

class UserPlant extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={plant} />
        <div className="UserPlantName">
          {this.props.nickname}
        </div>
      </div>
    );
  }
}

export default UserPlant;
